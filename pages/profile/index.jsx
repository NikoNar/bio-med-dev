import React from 'react'
import {useRouter} from 'next/router'
import {destroyCookie, parseCookies} from 'nookies'
import ProfStyle from './profile.module.scss'
import dynamic from 'next/dynamic'
const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), { ssr: false })
import {Tab, TabList, TabPanel } from "react-tabs";
import TabStyle from "../../components/Tab/tab.module.scss";
import TabButtons from "../../components/TabButtons/TabButtons";
import {changePasswordUrl, contactInfoUrl, resultsUrl} from "../../utils/url";
import LinkButton from "../../components/LinkButton/LinkButton";
const ContactUs  = dynamic(()=>import("../../components/ContactUs/ContactUs"), {ssr: false});
import AnalyzesResults from "../../components/AnalyzesResults/AnalyzesResults";
import {useSelector} from "react-redux";
import RegisterFormStyle from "../../components/AccountForms/RegisterForm/register-form.module.scss";
import DatePicker from 'react-datepicker'
import Button from "../../components/Button/Button";
import {useForm, Controller} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";


const editProfileSchema = Yup.object().shape({
    editProfileFullName: Yup.string().matches(/^([^1-9]*)$/, 'Անունը պետք է պարունակի միայն տառեր').required('Մուտքագրեք Ձեև անունը և ազգանունը'),
    editProfileGender: Yup.string().nullable(true).required('Ընտրեք Ձեր սեռը'),
    editProfileDate: Yup.string().required('Մուտքագրեք Ձեև ծննդյան ամսաթիվը'),
    editProfileEmail: Yup.string().email('Մուտքագրած էլ․ հասցեն պետք է լինի հետևյալ ֆորմատով (test@test.am)').required('Մուտքագրեք Ձեև էլ․ հասցեն'),
    editProfilePhone: Yup.string().required('Մուտքագրեք Ձեև էլ․ հեռահոասահամարը'),
})

const changePasswordSchema = Yup.object().shape({
    editProfileNewPassword: Yup.string().min(4, 'Գաղտնաբառը պետք է պարունակի առնվազն 4 նիշ').max(10, 'Գաղտնաբառը պետք է պարունակի առավելագույնը 10 նիշ').required(),
    editProfileCurrentPassword: Yup.string().min(4, 'Գաղտնաբառը պետք է պարունակի առնվազն 4 նիշ').max(10, 'Գաղտնաբառը պետք է պարունակի առավելագույնը 10 նիշ').required(),
    editProfileConfirmPassword: Yup.string().oneOf([Yup.ref('editProfileNewPassword'), null]).required('Մուտքագրեք նոր գաղտնաբառը ևվս մեկ անգամ')
})




const Profile = ({contactInfo, results, token}) => {

    const currentUser = useSelector(state=>state.currentUser)
    const router = useRouter()

    const {
        handleSubmit: handleSubmitChangePassword,
        //control: controlEditProfile,
        reset: resetChangePassword,
        register: registerChangePassword,
        formState:{errors: errorsChangePassword}
    } = useForm(
        {
            mode: 'onBlur',
            resolver: yupResolver(changePasswordSchema)
        }
    );

    const {
        handleSubmit: handleSubmitProfileEdit,
        control: controlEditProfile,
        reset: resetChangeProfileEdit,
        register: registerEditProfile,
        formState:{errors: errorsEditProfile},
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
            router.push('/en')
        })
        setTimeout(()=>{
            destroyCookie(null, 'currentUser')
            destroyCookie(null, 'token')
        },1000)
    }

    const handleChangePassword = async (passwordData)=>{
        console.log(passwordData);
        const userCredentials = {...passwordData, loginEmail: currentUser.email, loginPassword: currentUser.password}
        await fetch(changePasswordUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userCredentials)
        })
            .then(res=> {
                res.json()
                resetChangePassword({})
            })
    }

    const handleProfileEdit = async (editProfileData)=>{
        console.log(editProfileData);
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
                                        <div className={RegisterFormStyle.Register}>
                                            <form onSubmit={handleSubmitProfileEdit(handleProfileEdit)}>
                                                <div className={RegisterFormStyle.FullName}>
                                                    <div className={'row'}>
                                                        <div className={'col-8'}>
                                                            <input
                                                                placeholder="Անուն Ազգանուն*"
                                                                type="text"
                                                                name='editProfileFullName'
                                                                defaultValue={currentUser && currentUser.fullName}
                                                                {...registerEditProfile('editProfileFullName')}
                                                            />
                                                            {errorsEditProfile.editProfileFullName &&
                                                            <div className={'error mt-3'}>
                                                                <p style={{color: '#ff0000'}}>
                                                                    {errorsEditProfile.editProfileFullName.message}
                                                                </p>
                                                            </div>
                                                            }
                                                        </div>
                                                        <div className={'col-4'}>
                                                            <div className={RegisterFormStyle.GenderBlock}>
                                                                <label htmlFor="editProfileMale" className={RegisterFormStyle.MaleActive}>
                                                                    <input
                                                                        type="radio"
                                                                        id="editProfileMale"
                                                                        value='male'
                                                                        defaultChecked={!!(currentUser && currentUser.gender === 'male')}
                                                                        {...registerEditProfile('editProfileGender')}
                                                                    />
                                                                    <span className="_icon-male"></span>
                                                                </label>
                                                                <label htmlFor="editProfileFemale" className={RegisterFormStyle.FemaleActive}>
                                                                    <input
                                                                        type="radio"
                                                                        id="editProfileFemale"
                                                                        value='female'
                                                                        defaultChecked={!!(currentUser && currentUser.gender === 'female')}
                                                                        {...registerEditProfile('editProfileGender')}
                                                                    />
                                                                    <span className="_icon-female"></span>
                                                                </label>
                                                            </div>
                                                            {errorsEditProfile.editProfileGender &&
                                                            <div className={'error mt-3'}>
                                                                <p style={{color: '#ff0000'}}>
                                                                    {errorsEditProfile.editProfileGender.message}
                                                                </p>
                                                            </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <Controller
                                                    control={controlEditProfile}
                                                    name="editProfileDate"
                                                    render={({field: {onChange, value}}) => (
                                                        <div className={RegisterFormStyle.DatePicker}>
                                                            <DatePicker
                                                                selected={new Date(currentUser.date)}
                                                                onChange={onChange}
                                                                dateFormat='dd/MM/yyyy'
                                                                placeholderText={'Ծննդյան օր ամիս տարեթիվ'}
                                                                style={{width: "100%"}}
                                                                withPortal
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                                yearDropdownItemNumber={100}
                                                                maxDate={new Date()}
                                                            />
                                                        </div>
                                                    )}
                                                />
                                                {errorsEditProfile.editProfileDate &&
                                                <div className={'error'}>
                                                    <p style={{color: '#ff0000'}}>
                                                        {errorsEditProfile.editProfileDate.message}
                                                    </p>
                                                </div>
                                                }

                                                <input
                                                    placeholder="էլ հասցե*"
                                                    type='email'
                                                    name='editProfileEmail'
                                                    {...registerEditProfile('editProfileEmail')}
                                                    defaultValue={currentUser && currentUser.email}
                                                />
                                                {errorsEditProfile.editProfileEmail &&
                                                <div className={'error'}>
                                                    <p style={{color: '#ff0000'}}>
                                                        {errorsEditProfile.editProfileEmail.message}
                                                    </p>
                                                </div>
                                                }
                                                <input
                                                    placeholder="հեռախոսի համար*"
                                                    type="tel"
                                                    name='editProfilePhone'
                                                    {...registerEditProfile('editProfilePhone')}
                                                    defaultValue={currentUser && currentUser.phone}
                                                />
                                                {errorsEditProfile.editProfilePhone &&
                                                <div className={'error'}>
                                                    <p style={{color: '#ff0000'}}>
                                                        {errorsEditProfile.editProfilePhone.message}
                                                    </p>
                                                </div>
                                                }
                                                <div style={{textAlign: 'right'}}>
                                                    <Button type={'submit'} text={'ՈՒղարկել'}/>
                                                </div>
                                            </form>
                                        </div>
                                        <h4 className={'mt-5'}>Անվտանգություն</h4>
                                        <div className={RegisterFormStyle.Register + ' ' + 'mt-5'}>
                                            <form onSubmit={handleSubmitChangePassword(handleChangePassword)}>
                                                <input
                                                    type="password"
                                                    placeholder="Ընթացիկ գաղտնաբառ"
                                                    name="editProfileCurrentPassword"
                                                    {...registerChangePassword('editProfileCurrentPassword')}
                                                />
                                                {errorsChangePassword.editProfileCurrentPassword &&
                                                <div className={'error mt-3'}>
                                                    <p style={{color: '#ff0000'}}>
                                                        {errorsChangePassword.editProfileCurrentPassword.message}
                                                    </p>
                                                </div>
                                                }
                                                <input
                                                    type="password"
                                                    placeholder="Նոր գաղտնաբառ"
                                                    name="editProfileNewPassword"
                                                    {...registerChangePassword('editProfileNewPassword')}
                                                />
                                                {errorsChangePassword.editProfileNewPassword &&
                                                <div className={'error mt-3'}>
                                                    <p style={{color: '#ff0000'}}>
                                                        {errorsChangePassword.editProfileNewPassword.message}
                                                    </p>
                                                </div>
                                                }
                                                <input
                                                    type="password"
                                                    placeholder="Գաղտնաբառի կրկնողություն"
                                                    name="editProfileConfirmPassword"
                                                    {...registerChangePassword('editProfileConfirmPassword')}
                                                />
                                                {errorsChangePassword.editProfileConfirmPassword &&
                                                <div className={'error mt-3'}>
                                                    <p style={{color: '#ff0000'}}>
                                                        {errorsChangePassword.editProfileConfirmPassword.message}
                                                    </p>
                                                </div>
                                                }
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
    const token  = ctx.req.cookies.token
    //const user = ctx.req ? ctx.req.cookies.currentUser : null
    const contactInfo = await fetch(contactInfoUrl, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    const results = await fetch(resultsUrl)
        .then(res=>res.json())
        .then(data=>data)


    return {
        props: {contactInfo, results, token},
    }
}

export default Profile
