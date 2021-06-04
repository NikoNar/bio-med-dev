import React from 'react';
import InnerSlider from '../InnerSlider/InnerSlider'
import TabStyle from './tab.module.scss'
import dynamic from 'next/dynamic'

const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), { ssr: true })
import {Tab, TabList, TabPanel} from 'react-tabs';
import TabButtons from "../TabButtons/TabButtons";



const TabComponent = ({analyzes, id}) => {

    return (
        <div className={'container'}>
            <div className={'row'}>
                <div className={'col-lg-12'}>
                    <h4> Հաճախ հանձնվող անալիզներ </h4>
                </div>
            </div>
            <Tabs>
                <TabList className={TabStyle.TabList}>
                    <Tab selectedClassName={TabStyle.Selected}><TabButtons text={'ԱՆԱԼԻԶՆԵՐ'}/></Tab>
                    <Tab selectedClassName={TabStyle.Selected}><TabButtons text={'ԿՈՄՊԼԵՔՍ'}/></Tab>
                </TabList>

                <TabPanel>
                    <div className={'container'}>
                        <div className={'row'}>
                            <div className={'col-lg-12'}>
                                <InnerSlider analyzes={analyzes} component={'analyzes'}/>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className={'container'}>
                        <div className={'row'}>
                            <div className={'col-lg-12'}>
                                <InnerSlider analyzes={analyzes} component={'analyzes'}/>
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};




export default TabComponent;