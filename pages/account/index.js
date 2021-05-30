import React from 'react';
import AccStyle from './account.module.scss'
import TabStyle from "../../components/Tab/tab.module.scss";
import LinkButton from "../../components/LinkButton/LinkButton";
import LoginForm from "../../components/AccountForms/LoginForm/LoginForm";
import RegisterForm from "../../components/AccountForms/RegisterForm/RegisterForm";


const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), { ssr: false }) // disable ssr
import {Tab, TabList, TabPanel} from "react-tabs";

import dynamic from "next/dynamic";


const Account = () => {
    return (
        <section className={AccStyle.Main}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <div className={AccStyle.Title}>
                            <h4> Ձեր անձնական հաշիվը </h4>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'col-lg-12'}>
                            <Tabs>
                                <TabList className={TabStyle.TabList}>
                                    <Tab selectedClassName={TabStyle.Selected}><LinkButton text={'ՄՈՒՏՔ'}/></Tab>
                                    <Tab selectedClassName={TabStyle.Selected}><LinkButton text={'ԳՐԱՆՑՎԵԼ'}/></Tab>
                                </TabList>
                                <div className={'row'}>
                                    <div className={'col-lg-6 mb-5 mb-lg-0'}>
                                        <TabPanel>
                                            <LoginForm/>
                                        </TabPanel>
                                        <TabPanel>
                                            <RegisterForm/>
                                        </TabPanel>
                                    </div>
                                    <div className={'col-lg-5 offset-0 offset-lg-1'}>
                                        <div className={AccStyle.Wrapper}>
                                            <div className={AccStyle.HasNoAccount}>
                                                <div className={AccStyle.HNTitle}>
                                                    <h4>Չունես անձնական հաշիվ?</h4>
                                                </div>
                                                <div className={AccStyle.HNtext}>
                                                    <p>
                                                        Դուք կկարողանաք ստեղծել այն թեստի արդյունքները վերանայելուց հետո և ստանալ հավատարիմ հաճախորդի առավելությունները
                                                    </p>
                                                </div>
                                                <div className={AccStyle.HNLink}>
                                                    <LinkButton text={'ՀԵՏԱԶՈՏՈՒԹՅՈՒՆՆԵՐ'}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Account;