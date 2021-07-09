import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {destroyCookie, setCookie} from 'nookies'
import ProfStyle from './profile.module.scss'
import dynamic from 'next/dynamic'

const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), {ssr: false})
import {Tab, TabList, TabPanel} from "react-tabs";
import TabStyle from "../../components/Tab/tab.module.scss";
import TabButtons from "../../components/TabButtons/TabButtons";
import {
    changePasswordUrl,
    contactInfoUrl,
    editProfileUrl,
    locationsUrl,
    loggedInUserInfo,
    resultsUrl
} from "../../utils/url";
import LinkButton from "../../components/LinkButton/LinkButton";

const ContactUs = dynamic(() => import("../../components/ContactUs/ContactUs"), {ssr: false});
import AnalyzesResults from "../../components/AnalyzesResults/AnalyzesResults";
import {useDispatch, useSelector} from "react-redux";
import RegisterFormStyle from "../../components/AccountForms/RegisterForm/register-form.module.scss";
import DatePicker from 'react-datepicker'
import Button from "../../components/Button/Button";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {getCurrentUserAction} from "../../redux/actions/getCurrentUserAction";
import {parsePhoneNumberFromString} from "libphonenumber-js";
import useTranslation from "next-translate/useTranslation";
import Account from "../account";
import ModalComponent from "../../components/Alerts/Modal/ModalComponent";




const Profile = ({contactInfo, results, token, user, contactPageInfo, t}) => {
    const currentUser = useSelector(state => state.currentUser)
    const [isEdited, setIsEdited] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [resError, setResError] = useState('')
    const router = useRouter()
    const dispatch = useDispatch()


    const editProfileSchema = Yup.object().shape({
        editProfileFullName: Yup.string().matches(/^([^1-9]*)$/).required(),
        editProfileGender: Yup.string().nullable(true).required(),
        editProfileDate: Yup.string().required(),
        editProfileEmail: Yup.string().email().required(),
        editProfilePhone: Yup.string().required(),
    })

    const changePasswordSchema = Yup.object().shape({
        editProfileNewPassword: Yup.string().min(4).max(10).required(),
        editProfileCurrentPassword: Yup.string().min(4).max(10).required(),
        editProfileConfirmPassword: Yup.string().oneOf([Yup.ref('editProfileNewPassword'), null]).required()
    })


    useEffect(()=>{
        setIsEdited(false)
        dispatch(getCurrentUserAction())
    },[isEdited])

    const {
        handleSubmit: handleSubmitChangePassword,
        //control: controlEditProfile,
        reset: resetChangePassword,
        register: registerChangePassword,
        formState: {errors: errorsChangePassword}
    } = useForm(
        {
            resolver: yupResolver(changePasswordSchema)
        }
    );

    const {
        handleSubmit: handleSubmitProfileEdit,
        control: controlEditProfile,
        reset: resetChangeProfileEdit,
        register: registerEditProfile,
        formState: {errors: errorsEditProfile},
        watch: editProfileWatch,
    } = useForm(
        {
            mode: 'onBlur',
            resolver: yupResolver(editProfileSchema)
        }
    );

    const handleLogOut = async (e) => {
        e.preventDefault()
        await fetch('https://biomed.codemanstudio.com/wp-json/wpoauthserver/v1/logout', {
            method: 'POST',
            mode:"no-cors",
            headers: {
                'ContentType': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "first_name": "",
                "email": ""
            }),
        })
            .then(() => {
                router.push('/')
            })
        /*setTimeout(() => {
            destroyCookie(null, 'currentUser')
            destroyCookie(null, 'token')
        }, 1000)*/
    }

    const handleChangePassword = async (passwordData) => {

        const userCredentials = {...passwordData, loginEmail: user.email, loginPassword: user.password}
        await fetch(changePasswordUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userCredentials)
        })
            .then(res => {
                res.json()
                resetChangePassword({})
            })
            .then(data=>{
                setIsEdited(true)
            })
    }

    const handleProfileEdit = async (editProfileData) => {
        await fetch(editProfileUrl  + `/${currentUser.user_id}?${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "first_name": editProfileData.editProfileFullName,
                "email": editProfileData.editProfileEmail,
                "consumer_key": "ck_a47e7fe464749514bb12d991f377ca074edf2f93",
                "consumer_secret": "cs_537e132ca0f429c320cf6a51c29332a9409d5432"
            })
        })
            .then(res => {
                return res.json()
            })
            .then((data)=>{
                const user = JSON.stringify(data.user)
                setIsEdited(true)
                setResError(data.message ? data.message : undefined)
                setIsOpen(true)
            })
            .then(()=>{
                !isOpen ? setTimeout( () => {
                    destroyCookie(null, 'currentUser')
                    destroyCookie(null, 'token')
                    router.push('/account')
                }, 1000) : false
            })
    }


    const validatePhoneNumber = (value)=>{
        const phoneNumber = parsePhoneNumberFromString(value)
        if (!phoneNumber){
            return value
        }

        return phoneNumber.formatInternational()

    }

    return (
               <section className={ProfStyle.Profile}>
                   <ModalComponent callBack={() => setIsOpen(false)} isOpen={isOpen}
                                   text={'You have successfully edited your profile'}
                                   error={resError}
                   />
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <div className={ProfStyle.Logout}>
                            <button
                                className={'btn btn-primary'}
                                onClick={(e) => {
                                    handleLogOut(e).then()
                                }}
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <div className={ProfStyle.Title}>
                            <h4>{t('common:personal_data')}</h4>
                        </div>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <Tabs>
                            <TabList className={TabStyle.TabList}>
                                <Tab selectedClassName={TabStyle.Selected}><TabButtons text={t('common:orders')}/></Tab>
                                <Tab selectedClassName={TabStyle.Selected}><TabButtons text={t('common:edit_profile')}/></Tab>
                            </TabList>

                            <TabPanel>
                                <AnalyzesResults results={results}/>
                            </TabPanel>
                            <TabPanel>
                                <div className={'row pt-5'}>
                                    <div className={'col-lg-6'}>
                                        <div className={RegisterFormStyle.Register}>
                                            <form onSubmit={handleSubmitProfileEdit(handleProfileEdit)}>
                                                <div className={'row'}>
                                                    <div className={'col-lg-12'}>
                                                        <div className={RegisterFormStyle.FullName}>
                                                            <input
                                                                placeholder={t('common:full_name')}
                                                                type="text"
                                                                name='registerFullName'
                                                                defaultValue={currentUser && currentUser.user_meta.first_name[0]}
                                                                {...registerEditProfile('editProfileFullName')}
                                                                style={{borderColor: errorsEditProfile.editProfileFullName ? '#ff0000' : 'transparent'}}
                                                            />
                                                            <div className={RegisterFormStyle.GenderBlock}>
                                                                <label htmlFor="male" className={RegisterFormStyle.MaleActive}>
                                                                    <input
                                                                        type="radio"
                                                                        id="male"
                                                                        value='male'
                                                                        //defaultChecked={!!(currentUser && currentUser.gender === 'male')}
                                                                        {...registerEditProfile('editProfileGender')}
                                                                        style={{borderColor: errorsEditProfile.editProfileGender ? '#ff0000' : 'transparent'}}
                                                                    />
                                                                    <span className="_icon-male"></span>
                                                                </label>
                                                                <label htmlFor="female" className={RegisterFormStyle.FemaleActive}>
                                                                    <input
                                                                        type="radio"
                                                                        id="female"
                                                                        value='female'
                                                                        //defaultChecked={!!(currentUser && currentUser.gender === 'female')}
                                                                        {...registerEditProfile('editProfileGender')}
                                                                        style={{borderColor: errorsEditProfile.editProfileGender ? '#ff0000' : 'transparent'}}
                                                                    />
                                                                    <span className="_icon-female"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Controller
                                                    control={controlEditProfile}
                                                    name="editProfileDate"
                                                    //defaultValue={new Date(currentUser && currentUser.date)}
                                                    render={({field: {onChange, value, ref}}) => {
                                                        return (

                                                            <div className={ProfStyle.ProfileDatePicker}>
                                                                <DatePicker
                                                                    selected={value}
                                                                    onChange={onChange}
                                                                    dateFormat='dd/MM/yyyy'
                                                                    style={{width: "100%", borderColor: errorsEditProfile.editProfileGender ? '#ff0000' : 'transparent'}}
                                                                    withPortal
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    yearDropdownItemNumber={100}
                                                                    maxDate={new Date()}
                                                                    inputRef={ref}
                                                                />
                                                            </div>
                                                        )
                                                    }}
                                                />
                                                <input
                                                    placeholder={t('common:email')}
                                                    type='email'
                                                    name='editProfileEmail'
                                                    {...registerEditProfile('editProfileEmail')}
                                                    defaultValue={currentUser && currentUser.user_email}
                                                    style={{borderColor: errorsEditProfile.editProfileEmail ? '#ff0000' : 'transparent'}}
                                                />
                                                <input
                                                    placeholder={t('common:phone_number')}
                                                    type="tel"
                                                    name='editProfilePhone'
                                                    {...registerEditProfile('editProfilePhone')}
                                                    //defaultValue={currentUser && currentUser.phone}
                                                    onChange={(event)=>{
                                                        event.target.value = validatePhoneNumber(event.target.value)
                                                    }}
                                                    style={{borderColor: errorsEditProfile.editProfilePhone ? '#ff0000' : 'transparent'}}
                                                />
                                                <div style={{textAlign: 'right'}}>
                                                    <Button type={'submit'} text={t('common:submit')}/>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className={'col-lg-5 offset-0 offset-lg-1'}>
                                        <div className={ProfStyle.Wrapper}>
                                            <h4 className={'mt-5 mt-lg-0'}>{t('common:security')}</h4>
                                            <div className={RegisterFormStyle.Register + ' ' + 'mt-5'}>
                                                <form onSubmit={handleSubmitChangePassword(handleChangePassword)}>
                                                    <input
                                                        type="password"
                                                        placeholder={t('common:current_password')}
                                                        name="editProfileCurrentPassword"
                                                        {...registerChangePassword('editProfileCurrentPassword')}
                                                        style={{borderColor: errorsChangePassword.editProfileCurrentPassword ? '#ff0000' : 'transparent'}}
                                                    />
                                                    <input
                                                        type="password"
                                                        placeholder={t('common:new_password')}
                                                        name="editProfileNewPassword"
                                                        {...registerChangePassword('editProfileNewPassword')}
                                                        style={{borderColor: errorsChangePassword.editProfileNewPassword ? '#ff0000' : 'transparent'}}
                                                    />
                                                    <input
                                                        type="password"
                                                        placeholder={t('common:confirm_password')}
                                                        name="editProfileConfirmPassword"
                                                        {...registerChangePassword('editProfileConfirmPassword')}
                                                        style={{borderColor: errorsChangePassword.editProfileConfirmPassword ? '#ff0000' : 'transparent'}}
                                                    />
                                                    <div style={{textAlign: 'right'}}>
                                                        <Button type={'submit'} text={t('common:save')}/>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
                <ContactUs contactInfo={contactInfo} contactPageInfo={contactPageInfo} t={t}/>
            </div>
        </section>
    )
}

export async function getServerSideProps(ctx) {

    if (Object.entries(ctx.req.cookies).length<=0 || !ctx.req.cookies.currentUser){
        return {
            redirect: {
                destination: '/account',
                permanent: false,
            }
        }
    }

    const token = ctx.req.cookies.token ? ctx.req.cookies.token : null

    const contactInfo = await fetch(`${locationsUrl}?status=publish&lang=${ctx.locale}`)
        .then(res => res.json())
        .then(data => data)

    const contactPageInfo = await fetch(contactInfoUrl + `&lang=${ctx.locale}`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    return {
        props: {
            contactInfo,
            //results,
            token,
            contactPageInfo
            //user
        },
    }
}

export default Profile
