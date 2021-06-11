import React, {useCallback, useEffect, useState} from 'react';
import {analyzesTypesUrl, analyzesUrl, callHomeUrl} from "../../utils/url";
import AnalyzesStyle from './Analyzes.module.scss'
import Link from "next/link";
import AnalyzesCard from "../../components/AnalyzesCard/AnalyzesCard";
import TabStyle from "../../components/Tab/tab.module.scss";
import dynamic from "next/dynamic";

const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), {ssr: true})
import {resetIdCounter, Tab, TabList, TabPanel} from "react-tabs";
import TabButtons from "../../components/TabButtons/TabButtons";
import {useDispatch, useSelector} from "react-redux";
import {filterAnalyzesByCategory, filterAnalyzesByEvents} from "../../redux/actions/setSelectedFiltersAction";



const Analyzes = ({analyzesTypes, analyzes}) => {

    const dispatch = useDispatch()
    const selectedFilters = useSelector(state => state.filters)
    const [filters, setFilters] = useState(analyzes)


    useEffect(()=>{
        selectedFilters && setFilters(selectedFilters)
    },[selectedFilters])

    const handleCategoryFilter = (e) => {
        const value = e.target.value
        dispatch(filterAnalyzesByCategory(value))
    }


    const handleEventsFilter = (e)=>{
        console.log(e.target.value);
        const value = e.target.value
        dispatch(filterAnalyzesByEvents(value))
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
                        <Tab selectedClassName={TabStyle.Selected}><TabButtons text={'ԳՈՐԾԻՔԱՅԻՆ'}/></Tab>
                        <Tab selectedClassName={TabStyle.Selected}><TabButtons text={'ԼԱԲՈՐԱՏՈՐ'}/></Tab>
                    </TabList>
                    <div className={'row'}>
                        <div className={'col-lg-12'}>
                            <TabPanel>
                                <div className={'row'}>
                                    <div className={'col-lg-12'}>
                                        <div className={AnalyzesStyle.Header}>
                                            <div className={'row'}>
                                                <div className={'col-lg-12'}>
                                                    <div className={AnalyzesStyle.Tags}>
                                                        <ul>
                                                            <li className={AnalyzesStyle.Event}>
                                                                <input id={'events-1'} type='radio' name={'events-1'} value='event' onChange={(e)=>handleEventsFilter(e)}/>
                                                                <label htmlFor={'events-1'}>ԱԿՑԻԱՆԵՐ</label>
                                                            </li>
                                                            <li className={AnalyzesStyle.Emergency}>
                                                                <input id={'homeCall-1'} type="radio" name={'events-1'} value='homeCall' onChange={(e)=>handleEventsFilter(e)}/>
                                                                <label htmlFor={'homeCall-1'}>ԿԱՆՉ ՏՈՒՆ</label>
                                                            </li>
                                                            {
                                                                analyzesTypes ? analyzesTypes.map((item, index) => {
                                                                    return (
                                                                        <li key={item.id}>
                                                                            <input type="radio"
                                                                                   id={item.title}
                                                                                   name={'filters'}
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
                                            filters && filters.length > 0 ? filters.map((item, index) => {
                                                return (
                                                    <div className={'row mb-5'} key={item.id}>
                                                        <div className={'col-lg-12'}>
                                                            <div className={AnalyzesStyle.Item}>
                                                                <Link href={'/single-analyse-page'}><a className={AnalyzesStyle.Link}> </a></Link>
                                                                <AnalyzesCard inner={item}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }) : <div><h3>Ther is no any result with that filter</h3></div>
                                        }
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className={'row'}>
                                    <div className={'col-lg-12'}>
                                        <div className={AnalyzesStyle.Header}>
                                            <div className={'row'}>
                                                <div className={'col-lg-12'}>
                                                    <div className={AnalyzesStyle.Tags}>
                                                        <ul>
                                                            <li className={AnalyzesStyle.Event}>
                                                                <input id={'events-2'} type='radio' name={'events-2'} value='events'/>
                                                                <label htmlFor={'events-2'}>ԱԿՑԻԱՆԵՐ</label>
                                                            </li>
                                                            <li className={AnalyzesStyle.Emergency}>
                                                                <input id={'homeCall-2'} type="radio" name={'events-2'} value='homeCall'/>
                                                                <label htmlFor={'homeCall-2'}>ԿԱՆՉ ՏՈՒՆ</label>
                                                            </li>
                                                            {
                                                                analyzesTypes ? analyzesTypes.map((item, index) => {
                                                                    return (
                                                                        <li key={item.id}>
                                                                            <input type="radio"
                                                                                   id={item.title}
                                                                                   name={'filters-2'}
                                                                                   value={item.id}
                                                                                   onChange={(e) => handleCategoryFilter(e)}
                                                                            />
                                                                            <label htmlFor={item.title}>{item.title}</label>
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
                                            filters ? filters.map((item) => {
                                                return (
                                                    <div className={'row mb-5'} key={item.id}>
                                                        <div className={'col-lg-12'}>
                                                            <div className={AnalyzesStyle.Item}>
                                                                <Link href={'/single-analyse-page'}><a className={AnalyzesStyle.Link}> </a></Link>
                                                                <AnalyzesCard inner={item}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }) : null
                                        }
                                    </div>
                                </div>
                            </TabPanel>
                        </div>
                    </div>
                </Tabs>
            </div>
        </section>
    );
};


export async function getServerSideProps() {
    resetIdCounter();

    const analyzesTypes = await fetch(analyzesTypesUrl)
        .then(res => res.json())
        .then(data => data)

    const analyzes = await fetch(analyzesUrl, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    return {
        props: {
            analyzesTypes: analyzesTypes,
            analyzes: analyzes
        }
    }
}

export default Analyzes;