import React, {useEffect} from 'react';
import {analyzesTypesUrl, analyzesUrl} from "../../utils/url";
import AnalyzesStyle from './Analyzes.module.scss'
import Link from "next/link";
import AnalyzesCard from "../../components/AnalyzesCard/AnalyzesCard";
import TabStyle from "../../components/Tab/tab.module.scss";
import LinkButton from "../../components/LinkButton/LinkButton";
import AnalyzesFilter from "../../components/AnalyzesFilter/AnalyzesFilter";
import dynamic from "next/dynamic";


const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), {ssr: true}) // disable ssr
import {Tab, TabList, TabPanel} from "react-tabs";
import TabButtons from "../../components/TabButtons/TabButtons";


const Analyzes = ({analyzesTypes, analyzes}) => {

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
                                <AnalyzesFilter analyzesTypes={analyzesTypes} analyzes={analyzes}/>
                                <div className={'row'}>
                                    <div className={'col-lg-12'}>

                                        {
                                            analyzes ? analyzes.map((item) => {
                                                return (
                                                    <div className={'row mb-5'} key={item.id}>
                                                        <div className={'col-lg-12'}>
                                                            <div className={AnalyzesStyle.Item}>
                                                                <Link href={'/single-analyse-page'}><a className={AnalyzesStyle.Link}></a></Link>
                                                                <AnalyzesCard analyze={item}/>
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
                                <AnalyzesFilter analyzesTypes={analyzesTypes} analyzes={analyzes}/>
                                <div className={'row'}>
                                    <div className={'col-lg-12'}>

                                        {
                                            analyzes ? analyzes.map((item) => {
                                                return (
                                                    <div className={'row mb-5'} key={item.id}>
                                                        <div className={'col-lg-12'}>
                                                            <div className={AnalyzesStyle.Item}>
                                                                <Link href={'/single-analyse-page'}><a className={AnalyzesStyle.Link}></a></Link>
                                                                <AnalyzesCard analyze={item}/>
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