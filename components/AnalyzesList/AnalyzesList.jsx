import React, {useEffect, useState} from 'react';
import AnalyzesStyle from "../../pages/analyzes/Analyzes.module.scss";
import {Tab, TabList, TabPanel} from "react-tabs";
import TabStyle from "../Tab/tab.module.scss";
import TabButtons from "../TabButtons/TabButtons";
import AnalyzesCard from "../AnalyzesCard/AnalyzesCard";
import {useDispatch, useSelector} from "react-redux";
import {filterAnalyzesByCategory, filterAnalyzesByEvents} from "../../redux/actions/setSelectedFiltersAction";
import dynamic from "next/dynamic";
const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), {ssr: true})


const AnalyzesList = ({ analyzes, categories}) => {

    const dispatch = useDispatch()
    const selectedFilters = useSelector(state => state.filters)
    const [allAnalyzes, setAllAnalyzes] = useState(analyzes)
    const [mainCategory, setMainCategory] = useState(categories[0].main)


    useEffect(()=>{
        if(selectedFilters){
            analyzes = selectedFilters
            setAllAnalyzes(analyzes)
        }
    },[selectedFilters])


    const handleCategoryFilter = (e) => {
        const value = e.target.value
        dispatch(filterAnalyzesByCategory(value))
    }


    const handleEventsFilter = (e)=>{
        const value = e.target.value
        dispatch(filterAnalyzesByEvents(value))
    }

    const handleMainCategoryName = (e)=>{
        const tabName = e.target.getAttribute("data-value")
        setAllAnalyzes(analyzes)
        setMainCategory(tabName)
    }


    return (
        <section className={AnalyzesStyle.Main}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-6 col-sm-12'}>
                        <h4>Հետազոտություններ</h4>
                    </div>
                </div>
                <Tabs>
                    <TabList className={TabStyle.TabList}>
                        {
                            categories && categories.map((m)=>{
                                return (
                                    <Tab selectedClassName={TabStyle.Selected} key={m.main}>
                                        <TabButtons
                                            text={m.title}
                                            dataName={m.main}
                                            callBack={(e)=>handleMainCategoryName(e)}
                                        />
                                    </Tab>
                                )
                            })
                        }
                    </TabList>
                    <div className={'row'}>
                        <div className={'col-lg-12'}>
                            {
                                categories && categories.map((m)=>{
                                    return (
                                        <TabPanel key={m.title}>
                                            <div className={'row'}>
                                                <div className={'col-lg-12'}>
                                                    <div className={AnalyzesStyle.Header}>
                                                        <div className={'row'}>
                                                            <div className={'col-lg-12'}>
                                                                <div className={AnalyzesStyle.Tags}>
                                                                    <ul>
                                                                        <li className={AnalyzesStyle.Event}>
                                                                            <input
                                                                                id={'events-1'}
                                                                                type='radio'
                                                                                name={'events-1'}
                                                                                value='event'
                                                                                onChange={(e)=>handleEventsFilter(e)}
                                                                            />
                                                                            <label htmlFor={'events-1'}>ԱԿՑԻԱՆԵՐ</label>
                                                                        </li>
                                                                        <li className={AnalyzesStyle.Emergency}>
                                                                            <input
                                                                                id={'homeCall-1'}
                                                                                type="radio"
                                                                                name={'events-1'}
                                                                                value='homeCall'
                                                                                onChange={(e)=>handleEventsFilter(e)}
                                                                            />
                                                                            <label htmlFor={'homeCall-1'}>ԿԱՆՉ ՏՈՒՆ</label>
                                                                        </li>
                                                                        {
                                                                            m.subcategories ? m.subcategories.map((item, index) => {
                                                                                return (
                                                                                    <li key={item.id}>
                                                                                        <input type="radio"
                                                                                               id={item.title}
                                                                                               name={item.parent}
                                                                                               value={item.id}
                                                                                               onChange={(e) => handleCategoryFilter(e)}
                                                                                        />
                                                                                        <label
                                                                                            htmlFor={item.title}>{item.title}</label>
                                                                                    </li>
                                                                                )
                                                                            }) : ''
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={'row'}>
                                                <div className={'col-lg-12'}>
                                                    {
                                                        allAnalyzes && allAnalyzes.length > 0 ? allAnalyzes.map((a, index)=>{
                                                            if (mainCategory === a.mainCategory){
                                                                return (
                                                                    <div className={'row mb-5'} key={a.id}>
                                                                        <div className={'col-lg-12'}>
                                                                            <div className={AnalyzesStyle.a}>
                                                                                <AnalyzesCard inner={a} index={index} id={a.id}/>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        }) :
                                                            <div className={AnalyzesStyle.NoMatch}>
                                                                <h4>There is no any analyzes in this category</h4>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </TabPanel>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Tabs>
            </div>
        </section>
    );
};

export default AnalyzesList;