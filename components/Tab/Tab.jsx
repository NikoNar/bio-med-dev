import React, {useEffect, useState} from 'react';
import InnerSlider from '../InnerSlider/InnerSlider'
import TabStyle from './tab.module.scss'
import dynamic from 'next/dynamic'
import TabButtons from "../TabButtons/TabButtons";
const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), { ssr: true })
import {Tab, TabList, TabPanel} from 'react-tabs';
import useTranslation from "next-translate/useTranslation";



const TabComponent = ({analyzes, categories, t}) => {
    //const {t} = useTranslation()


    const [allAnalyzes, setAllAnalyzes] = useState(analyzes)
    const [mainCategory, setMainCategory] = useState(categories[0].main)


    const handleMainCategoryName = (e)=>{
        const tabName = e.target.getAttribute("data-value")
        setAllAnalyzes(analyzes)
        setMainCategory(tabName)
    }

    return (
        <div className={'container'}>
            <div className={'row'}>
                <div className={'col-lg-12'}>
                    <h4>{t('common:frequently_passed_tests')}</h4>
                </div>
            </div>
            <Tabs>
                <TabList className={TabStyle.TabList}>
                    {
                        categories && categories.map((m)=>{
                            return (
                                <Tab selectedClassName={TabStyle.Selected} key={m.id} >
                                    <TabButtons
                                        text={m.name}
                                        //dataName={m.main}
                                        callBack={(e)=>handleMainCategoryName(e)}
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
                                <InnerSlider analyzes={allAnalyzes} component={'analyzes'} mainCategory={mainCategory}/>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className={'container'}>
                        <div className={'row'}>
                            <div className={'col-lg-12'}>
                                <InnerSlider analyzes={allAnalyzes} component={'analyzes'} mainCategory={mainCategory}/>
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};




export default TabComponent;