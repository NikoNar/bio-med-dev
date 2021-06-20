import React, {useEffect, useState} from 'react';
import InnerSlider from '../InnerSlider/InnerSlider'
import TabStyle from './tab.module.scss'
import dynamic from 'next/dynamic'
import TabButtons from "../TabButtons/TabButtons";
const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), { ssr: true })
import {Tab, TabList, TabPanel} from 'react-tabs';



const TabComponent = ({analyzes, categories}) => {

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
                    <h4> Հաճախ հանձնվող անալիզներ </h4>
                </div>
            </div>
            <Tabs>
                <TabList className={TabStyle.TabList}>
                    {
                        categories && categories.map((m)=>{
                            return (
                                <Tab selectedClassName={TabStyle.Selected} key={m.main} >
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