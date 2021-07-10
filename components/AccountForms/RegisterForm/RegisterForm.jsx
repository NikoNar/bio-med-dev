import React, {useEffect, useState} from 'react';
import RegisterFormStyle from './register-form.module.scss'
import Button from "../../Button/Button";
import DatePicker from 'react-datepicker'
import {loginUrl, registerUrl} from "../../../utils/url";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import useTranslation from "next-translate/useTranslation";
import RequiredFields from "../../Alerts/RequiredFields/RequiredFields";
import ModalComponent from "../../Alerts/Modal/ModalComponent";
import {setCookie} from "nookies";
import {useRouter} from "next/router";


const RegisterForm = ({security, currentUser}) => {

    const {t} = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const [resError, setResError] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const registerSchema = Yup.object().shape({
        first_name: Yup.string().matches(/^([^1-9]*)$/).required(),
        registerGender: Yup.string().nullable(true).required(),
        registerDate: Yup.string().required(),
        email: Yup.string().email().required(),
        registerPhone: Yup.string().required(),
        password: Yup.string().min(4).max(10).required(),
        registerConfirmPassword: Yup.string().oneOf([Yup.ref('password'), null])
    })


    const {
        handleSubmit: handleRegisterSubmit,
        register: handleRegisterRegister,
        control: registerControl,
        watch: registerWatch,
        formState: {errors},
        reset: registerFormReset
    } = useForm(
        {
            mode: 'onBlur',
            resolver: yupResolver(registerSchema),
            reValidateMode: "onChange"
        }
    );

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);


    const registerHandleSubmit = async (registerData) => {

        await fetch(registerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...registerData,
                meta_data: [
                    {user_dob: registerData.registerDate},
                    {user_gender: registerData.registerGender},
                    {user_phone: registerData.registerPhone}
                ]
            })
        })
            .then(res => res.json())
            .then(data => {
                registerFormReset({
                    registerFullName: '',
                    registerEmail: '',
                    registerPhone: '',
                    password: '',
                    registerConfirmPassword: ''
                })
                setResError(data.message ? data.message : undefined)
                setIsOpen(true)
            })
            .catch((err)=>{
                console.log(err)
            })



    }


    return (
        <div className={RegisterFormStyle.Register}>
            <RequiredFields errors={errors}/>
            <ModalComponent callBack={() => setIsOpen(false)} isOpen={isOpen}
                            text={'You have successfully registered and now can log in to your profile'}
                            error={resError}
            />
            <form onSubmit={handleRegisterSubmit(registerHandleSubmit)}>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <div className={RegisterFormStyle.FullName}>
                            <input
                                placeholder={t('common:full_name')}
                                type="text"
                                name='first_name'
                                {...handleRegisterRegister('first_name')}
                                style={{borderColor: errors.first_name ? '#ff0000' : 'transparent'}}
                            />
                            <div className={RegisterFormStyle.GenderBlock}>
                                <label htmlFor="male" className={RegisterFormStyle.MaleActive}>
                                    <input
                                        type="radio"
                                        id="male"
                                        value='male'
                                        {...handleRegisterRegister('registerGender')}
                                        style={{borderColor: errors.registerGender ? '#ff0000' : 'transparent'}}
                                    />
                                    <span className="_icon-male"></span>
                                </label>
                                <label htmlFor="female" className={RegisterFormStyle.FemaleActive}>
                                    <input
                                        type="radio"
                                        id="female"
                                        value='female'
                                        {...handleRegisterRegister('registerGender')}
                                        style={{borderColor: errors.registerGender ? '#ff0000' : 'transparent'}}
                                    />
                                    <span className="_icon-female"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <Controller
                    control={registerControl}
                    name="registerDate"
                    defaultValue={''}
                    render={({field: {onChange, value}}) => (
                        <div className={
                            errors.registerDate ? RegisterFormStyle.DatePicker + ' ' + RegisterFormStyle.DatePickerWithError : RegisterFormStyle.DatePicker
                        }>
                            <DatePicker
                                selected={value}
                                onChange={onChange}
                                dateFormat='dd/MM/yyyy'
                                placeholderText={t('common:birth_date')}
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

                <input
                    placeholder={t('common:email')}
                    type='email'
                    name='email'
                    {...handleRegisterRegister('email')}
                    defaultValue={currentUser ? currentUser.email : ''}
                    style={{borderColor: errors.email ? '#ff0000' : 'transparent'}}
                />

                <input
                    placeholder={t('common:phone_number')}
                    type="tel"
                    name='registerPhone'
                    {...handleRegisterRegister('registerPhone')}
                    defaultValue={currentUser ? currentUser.phone : ''}
                    style={{borderColor: errors.registerPhone ? '#ff0000' : 'transparent'}}
                />

                <input
                    placeholder={t('common:password')}
                    type="password"
                    name='password'
                    {...handleRegisterRegister('password')}
                    style={{
                        display: security ? 'none' : 'block',
                        borderColor: errors.password ? '#ff0000' : 'transparent'
                    }}
                />

                <input
                    placeholder={t('common:confirm_password')}
                    type="password"
                    name='registerConfirmPassword'
                    {...handleRegisterRegister('registerConfirmPassword')}
                    style={{
                        display: security ? 'none' : 'block',
                        borderColor: errors.registerConfirmPassword ? '#ff0000' : 'transparent'
                    }}
                />

                <div style={{textAlign: 'right'}}>
                    <Button type={'submit'} text={t('common:submit')}/>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
