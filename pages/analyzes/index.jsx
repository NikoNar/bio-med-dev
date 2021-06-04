import React, {useEffect, useState} from 'react';
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
import {setSelectedFiltersAction} from "../../redux/actions/setSelectedFiltersAction";


const Analyzes = ({analyzesTypes, analyzes}) => {

    const dispatch = useDispatch()
    const selectedFilters = useSelector(state=>state.filters)
    const [filters, setFilters] = useState(analyzes)

    const handleChange = (e)=>{
        const value = e.target.value
        const status =e.target.checked
        dispatch(setSelectedFiltersAction(value, status))
        const newAnalyzes = analyzes.filter(f=>selectedFilters.some(sf=>f.type === sf))

        newAnalyzes <= 0 ? setFilters(analyzes) : setFilters(newAnalyzes)
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
                                                            <li className={AnalyzesStyle.Event}><Link href={'/events'}><a>ԱԿՑԻԱՆԵՐ</a></Link></li>
                                                            <li className={AnalyzesStyle.Emergency}><Link href={'/home-call'}><a>ԿԱՆՉ ՏՈՒՆ</a></Link></li>
                                                            {
                                                                analyzesTypes ? analyzesTypes.map((item, index)=>{
                                                                    return(
                                                                        <li key={item.id}>
                                                                            <input type="checkbox" id={item.title} value={item.title} onChange={(e)=>handleChange(e)}/>
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
                                                                <Link href={'/single-analyse-page'}><a className={AnalyzesStyle.Link}></a></Link>
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
                            <TabPanel>
                                <div className={'row'}>
                                    <div className={'col-lg-12'}>
                                        <div className={AnalyzesStyle.Header}>
                                            <div className={'row'}>
                                                <div className={'col-lg-12'}>
                                                    <div className={AnalyzesStyle.Tags}>
                                                        <ul>
                                                            <li className={AnalyzesStyle.Event}><Link href={'/events'}><a>ԱԿՑԻԱՆԵՐ</a></Link></li>
                                                            <li className={AnalyzesStyle.Emergency}><Link href={'/home-call'}><a>ԿԱՆՉ ՏՈՒՆ</a></Link></li>
                                                            {
                                                                analyzesTypes ? analyzesTypes.map((item, index)=>{
                                                                    return(
                                                                        <li key={item.id}>
                                                                            <input type="checkbox" id={item.title} value={item.title} onChange={(e)=>handleChange(e)}/>
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
                                                                <Link href={'/single-analyse-page'}><a className={AnalyzesStyle.Link}></a></Link>
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