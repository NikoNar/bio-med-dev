import React, {useEffect, useMemo, useState} from 'react';
import InnerSlider from '../InnerSlider/InnerSlider'
import TabStyle from './tab.module.scss'
import dynamic from 'next/dynamic'
import TabButtons from "../TabButtons/TabButtons";
const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), { ssr: false })
import {Tab, TabList, TabPanel} from 'react-tabs';
import {analyzesUrl} from "../../utils/url";



const TabComponent = ({categories, t, loc, analyzes}) => {

    const [allAnalyzes, setAllAnalyzes] = useState(analyzes && analyzes)
    const [tabIndex, setTabIndex] = useState(0);


    useEffect(() => {
        setTabIndex(0)
        setAllAnalyzes(analyzes)
    }, [loc])


    const handleInnerSliderMainCategoryName = async (e) => {

        const tabName = e.target.getAttribute("data-value")
        //setMainCategory(tabName)

        const currentCategoryTests = await fetch(analyzesUrl +
            `?lang=${loc}` +
            `&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`+
            `&category=${tabName}`)
            .then(res=>res.json())
            .then(data=>data)
        setAllAnalyzes(currentCategoryTests)
    }

    return (
        <div className={'container'}>
            <div className={'row'}>
                <div className={'col-lg-12'}>
                    <h4>{t('common:frequently_passed_tests')}</h4>
                </div>
            </div>
            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                <TabList className={TabStyle.TabList} >
                    {
                        categories && categories.map((m)=>{
                            return (
                                <Tab selectedClassName={TabStyle.Selected} key={m.id}>
                                    <TabButtons
                                        text={m.name}
                                        dataName={m.id}
                                        callBack={(e)=>handleInnerSliderMainCategoryName(e)}
                                    />
                                </Tab>
                            )
                        })
                    }
                </TabList>

                <TabPanel>
                    <div className={'container'}>
                        <div className={'row'}>
                            <div className={'col-lg-12'}>
                                <InnerSlider analyzes={allAnalyzes && allAnalyzes} component={'analyzes'}/>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className={'container'}>
                        <div className={'row'}>
                            <div className={'col-lg-12'}>
                                <InnerSlider analyzes={allAnalyzes && allAnalyzes} component={'analyzes'}/>
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};




export default TabComponent;
