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
import LinkButton from "../../components/LinkButton/LinkButton";
const ContactUs  = dynamic(()=>import("../../components/ContactUs/ContactUs"), {ssr: false});
import AnalyzesResults from "../../components/AnalyzesResults/AnalyzesResults";
import {useSelector} from "react-redux";
import RegisterFormStyle from "../../components/AccountForms/RegisterForm/register-form.module.scss";
import Button from "../../components/Button/Button";
import {useForm, Controller} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import CheckoutStyle from "../../components/CheckoutForm/checkout.module.scss";






const Profile = ({user, contactInfo, results}) => {

    const currentUser = useSelector(state=>state.currentUser)
    const router = useRouter()

    console.log(user);

    const {
        handleSubmit: handleChangePassword,
        //control: controlEditProfile,
        //reset: resetEditProfile,
        register: registerEditProfile,
        formState:{errors: errorsEditProfile}
    }= useForm();





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
                                        <RegisterForm security={true} currentUser={currentUser ? currentUser : null}/>
                                        <h4 className={'mt-5'}>Անվտանգություն</h4>
                                        <div className={RegisterFormStyle.Register + ' ' + 'mt-5'}>
                                            <form onSubmit={handleChangePassword((reserveData) => handleSubmitReserveOrders(reserveData))}>
                                                <input
                                                    type="password"
                                                    placeholder="Ընթացիկ գաղտնաբառ"
                                                    name="editProfileCurrentPassword"
                                                    {...registerEditProfile('editProfileCurrentPassword', {required: 'Մուտքագրեք Ձեր ընթացիկ գաղտնաբառը'})}
                                                />
                                                <ErrorMessage
                                                    errors={errorsEditProfile}
                                                    name="editProfileCurrentPassword"
                                                    render={({message}) =>  <div className={'error'}><p style={{color: '#ff0000'}}>Մուտքագրեք Ձեր ընթացիկ գաղտնաբառը</p></div>}
                                                />
                                                <input
                                                    type="password"
                                                    placeholder="Նոր գաղտնաբառ"
                                                    name="editProfileNewPassword"
                                                    {...registerEditProfile('editProfileNewPassword', {required: 'Մուտքագրեք Ձեր ընթացիկ գաղտնաբառը'})}
                                                />
                                                <ErrorMessage
                                                    errors={errorsEditProfile}
                                                    name="editProfileNewPassword"
                                                    render={({message}) =>  <div className={'error'}><p style={{color: '#ff0000'}}>Մուտքագրեք նոր գաղտնաբառը</p></div>}
                                                />
                                                <input
                                                    type="password"
                                                    placeholder="Գաղտնաբառի կրկնողություն"
                                                    name="editProfileRepeatPassword"
                                                    {...registerEditProfile('editProfileRepeatPassword', {required: 'Մուտքագրեք Ձեր ընթացիկ գաղտնաբառը'})}
                                                />
                                                <ErrorMessage
                                                    errors={errorsEditProfile}
                                                    name="editProfileRepeatPassword"
                                                    render={({message}) =>  <div className={'error'}><p style={{color: '#ff0000'}}>Կրկնեք նոր գաղտնաբառը</p></div>}
                                                />
                                                <div style={{textAlign: 'right'}}>
                                                    <Button type={'submit'} text={'Պահպանել'}/>
                                                </div>
                                            </form>
                                        </div>
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
        props: {contactInfo, results, user},
    }
}

export default Profile
