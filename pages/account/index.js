import React from 'react';
import AccStyle from './account.module.scss'
import TabStyle from "../../components/Tab/tab.module.scss";
import LinkButton from "../../components/LinkButton/LinkButton";
import LoginForm from "../../components/AccountForms/LoginForm/LoginForm";
import RegisterForm from "../../components/AccountForms/RegisterForm/RegisterForm";


const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), { ssr: false }) // disable ssr
import {resetIdCounter, Tab, TabList, TabPanel} from "react-tabs";

import dynamic from "next/dynamic";
import TabButtons from "../../components/TabButtons/TabButtons";
import useTranslation from "next-translate/useTranslation";


const Account = () => {

    const {t} = useTranslation()


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
                                    <Tab selectedClassName={TabStyle.Selected}><TabButtons text={t('common:login')}/></Tab>
                                    <Tab selectedClassName={TabStyle.Selected}><TabButtons text={t('common:register')}/></Tab>
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
                                                    <h4>{t('common:has_no_account')}</h4>
                                                </div>
                                                <div className={AccStyle.HNtext}>
                                                    <p>{t('common:has_no_account_text')}</p>
                                                </div>
                                                <div className={AccStyle.HNLink}>
                                                    <LinkButton text={t('common:analyzes')}/>
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


Account.getInitialProps = () => {
    resetIdCounter();

    return {
        props:{}
    }
};

export default Account;