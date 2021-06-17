import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {destroyCookie, setCookie} from 'nookies'
import ProfStyle from './profile.module.scss'
import dynamic from 'next/dynamic'

const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), {ssr: false})
import {Tab, TabList, TabPanel} from "react-tabs";
import TabStyle from "../../components/Tab/tab.module.scss";
import TabButtons from "../../components/TabButtons/TabButtons";
import {changePasswordUrl, contactInfoUrl, editProfileUrl, resultsUrl} from "../../utils/url";
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




const Profile = ({contactInfo, results, token, user}) => {

    const currentUser = useSelector(state => state.currentUser)
    const [isEdited, setIsEdited] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()

    const {t} = useTranslation()


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
        await fetch('/api/logout', {
            method: 'POST',
            headers: {
                Content0Type: 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then(() => {
                router.push('/')
            })
        setTimeout(() => {
            destroyCookie(null, 'currentUser')
            destroyCookie(null, 'token')
        }, 1000)
    }

    const handleChangePassword = async (passwordData) => {

        const userCredentials = {...passwordData, loginEmail: currentUser.email, loginPassword: currentUser.password}
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
        const userCredentials = {...editProfileData, loginEmail: currentUser.email, loginPassword: currentUser.password}
        await fetch(editProfileUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userCredentials)
        })
            .then(res => {
                return res.json()
            })
            .then((data)=>{
                const user = JSON.stringify(data.user)
                setCookie(null, 'currentUser', user)
                setCookie(null, 'token', data.access_token)
                setIsEdited(true)
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
                                                <div className={RegisterFormStyle.FullName}>
                                                    <div className={'row'}>
                                                        <div className={'col-8'}>
                                                            <input
                                                                placeholder={t('common:full_name')}
                                                                type="text"
                                                                name='editProfileFullName'
                                                                defaultValue={currentUser && currentUser.fullName}
                                                                {...registerEditProfile('editProfileFullName')}
                                                                style={{borderColor: errorsEditProfile.editProfileFullName ? '#ff0000' : 'transparent'}}
                                                            />
                                                        </div>
                                                        <div className={'col-4'}>
                                                            <div className={RegisterFormStyle.GenderBlock}>
                                                                <label htmlFor="editProfileMale"
                                                                       className={RegisterFormStyle.MaleActive}>
                                                                    <input
                                                                        type="radio"
                                                                        id="editProfileMale"
                                                                        value='male'
                                                                        defaultChecked={!!(currentUser && currentUser.gender === 'male')}
                                                                        {...registerEditProfile('editProfileGender')}
                                                                        style={{borderColor: errorsEditProfile.editProfileGender ? '#ff0000' : 'transparent'}}
                                                                    />
                                                                    <span className="_icon-male"></span>
                                                                </label>
                                                                <label htmlFor="editProfileFemale"
                                                                       className={RegisterFormStyle.FemaleActive}>
                                                                    <input
                                                                        type="radio"
                                                                        id="editProfileFemale"
                                                                        value='female'
                                                                        defaultChecked={!!(currentUser && currentUser.gender === 'female')}
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
                                                    defaultValue={new Date(currentUser && currentUser.date)}
                                                    render={({field: {onChange, value, ref}}) => {
                                                        return (

                                                            <div className={ProfStyle.ProfileDatePicker}>
                                                                <DatePicker
                                                                    selected={value}
                                                                    onChange={onChange}
                                                                    dateFormat='dd/MM/yyyy'
                                                                    //placeholderText={new Date(currentUser && currentUser.date).toLocaleDateString()}
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
                                                    defaultValue={currentUser && currentUser.email}
                                                    style={{borderColor: errorsEditProfile.editProfileEmail ? '#ff0000' : 'transparent'}}
                                                />
                                                <input
                                                    placeholder={t('common:phone_number')}
                                                    type="tel"
                                                    name='editProfilePhone'
                                                    {...registerEditProfile('editProfilePhone')}
                                                    defaultValue={currentUser && currentUser.phone}
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
                                            <h4 className={'mt-5'}>{t('common:security')}</h4>
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
                {/*<ContactInfoWithSelect contactInfo={contactInfo}/>*/}
                <ContactUs contactInfo={contactInfo}/>
            </div>
        </section>
    )
}

export async function getServerSideProps(ctx) {

    if (Object.entries(ctx.req.cookies).length<=0){
        return {
            redirect: {
                destination: '/account',
                permanent: false,
            }
        }
    }
    const token = ctx.req.cookies.token && ctx.req.cookies.token
    const user = ctx.req ? ctx.req.cookies.currentUser : null

    const contactInfo = await fetch(contactInfoUrl, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    const results = await fetch(resultsUrl)
        .then(res => res.json())
        .then(data => data)


    return {
        props: {contactInfo, results, token, user},
    }
}

export default Profile
