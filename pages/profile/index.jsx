import React from 'react'
import {useRouter} from 'next/router'
import {destroyCookie} from 'nookies'
import ProfStyle from './profile.module.scss'
import dynamic from 'next/dynamic'
const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), { ssr: false })
import {Tab, TabList, TabPanel } from "react-tabs";
import TabStyle from "../../components/Tab/tab.module.scss";
import TabButtons from "../../components/TabButtons/TabButtons";
import {contactInfoUrl, resultsUrl} from "../../utils/url";
const RegisterForm  = dynamic(()=>import("../../components/AccountForms/RegisterForm/RegisterForm"), {ssr: false});
//import RegisterForm from "../../components/AccountForms/RegisterForm/RegisterForm";
import LinkButton from "../../components/LinkButton/LinkButton";
const ContactUs  = dynamic(()=>import("../../components/ContactUs/ContactUs"), {ssr: false});
import AnalyzesResults from "../../components/AnalyzesResults/AnalyzesResults";




const Profile = ({user, contactInfo, results}) => {


    const router = useRouter()

    const handleLogOut = async (e) => {
        e.preventDefault()
        await fetch('/api/logout', {
            method: 'POST',
            headers: {
                Content0Type: 'application/json',
            },
            body: JSON.stringify({}),
        }).then(() => {
            destroyCookie(null, 'currentUser')
        })
        await router.push('/en')
    }


    return (
        <section className={ProfStyle.Profile}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <button
                            className={'btn btn-primary'}
                            onClick={(e) => {
                                handleLogOut(e).then()
                            }}
                        >
                            Log out
                        </button>
                        <div className={ProfStyle.Title}>
                            <h4> Անձնական տվյալներ </h4>
                        </div>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <Tabs>
                            <TabList className={TabStyle.TabList}>
                                <Tab selectedClassName={TabStyle.Selected}><TabButtons text={'ՊԱՏՎԵՐՆԵՐ'}/></Tab>
                                <Tab selectedClassName={TabStyle.Selected}><TabButtons text={'ԿԱՐԳԱՎՈՐՈՒՄՆԵՐ'}/></Tab>
                            </TabList>

                            <TabPanel>
                                <AnalyzesResults results={results}/>
                            </TabPanel>
                            <TabPanel>
                                <div className={'row pt-5'}>
                                    <div className={'col-lg-6'}>
                                        <RegisterForm security={true}/>
                                    </div>
                                    <div className={'col-lg-5 offset-0 offset-lg-1'}>
                                        <div className={ProfStyle.Wrapper}>
                                            <div className={ProfStyle.NoAccount}>
                                                <div className={ProfStyle.NoAccountTitle}>
                                                    <h4>Չունես անձնական հաշիվ?</h4>
                                                </div>
                                                <div className={ProfStyle.NoAccountText}>
                                                    <p>Դուք կկարողանաք ստեղծել այն թեստի արդյունքները վերանայելուց հետո և
                                                        ստանալ հավատարիմ հաճախորդի առավելությունները</p>
                                                </div>
                                                <div className={ProfStyle.NoAccountLink}>
                                                    <LinkButton text={'Հետազոտություն արդյունքները'}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
                {/*<ContactInfoWithSelect contactInfo={contactInfo}/>*/}
                <ContactUs contactInfo={contactInfo}/>
            </div>
        </section>
    )
}

export async function getServerSideProps(ctx) {

    const user = ctx.req ? ctx.req.cookies.currentUser : null

    const contactInfo = await fetch(contactInfoUrl, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    const results = await fetch(resultsUrl)
        .then(res=>res.json())
        .then(data=>data)


    return {
        props: {user, contactInfo, results},
    }
}

export default Profile
