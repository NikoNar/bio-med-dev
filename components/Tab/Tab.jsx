import React from 'react';
import LinkButton from "../LinkButton/LinkButton";
import AnalyzesSlider from '../AnalyzesSlider/AnalyzesSlider'
import TabStyle from './tab.module.scss'
import dynamic from 'next/dynamic'

const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), { ssr: true }) // disable ssr
import {Tab, TabList, TabPanel} from 'react-tabs';



const TabComponent = ({analyzes, id}) => {

    return (
        <>
            <div className={'row'}>
                <div className={'col-lg-12'}>
                    <h4> Հաճախ հանձնվող անալիզներ </h4>
                </div>
            </div>
            <Tabs>
                <TabList className={TabStyle.TabList}>
                    <Tab selectedClassName={TabStyle.Selected}><LinkButton text={'ԱՆԱԼԻԶՆԵՐ'}/></Tab>
                    <Tab selectedClassName={TabStyle.Selected}><LinkButton text={'ԿՈՄՊԼԵՔՍ'}/></Tab>
                </TabList>

                <TabPanel>
                    <AnalyzesSlider analyzes={analyzes}/>
                </TabPanel>
                <TabPanel>
                    <AnalyzesSlider analyzes={analyzes}/>
                </TabPanel>
            </Tabs>
        </>
    );
};




export default TabComponent;