import React, {useEffect, useState} from 'react';
import RegisterFormStyle from './register-form.module.scss'
import Button from "../../Button/Button";
import DatePicker from 'react-datepicker'
import {registerUrl} from "../../../utils/url";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import useTranslation from "next-translate/useTranslation";
import RequiredFields from "../../Alerts/RequiredFields/RequiredFields";
import ModalComponent from "../../Alerts/Modal/ModalComponent";
import {useRouter} from "next/router";


const RegisterForm = ({security, currentUser}) => {
    const nameRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const {t} = useTranslation()

    const [isOpen, setIsOpen] = useState(false)
    const [resError, setResError] = useState()
    const registerSchema = Yup.object().shape({
        first_name: Yup.string().matches(/^([^1-9]*)$/).required(t('errors:name_error')),
        registerGender: Yup.string().nullable(true).required(t('errors:gender_error')),
        registerDate: Yup.string().required(t('errors:birthday_error')),
        email: Yup.string().matches(nameRegex, t('errors:language_error')).email(t('errors:email_format_error')).required(t('errors:enter_email')),
        registerPhone: Yup.string().required(t('errors:phone_error')),
        password: Yup.string().min(6, t('errors:password_min_error')).max(16, t('errors:password_max_error')).required(),
        registerConfirmPassword: Yup.string().oneOf([Yup.ref('password'), null], t('errors:confirm_password_error'))
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
                    {
                        "key": "user_dob",
                        "value": registerData.registerDate
                    },
                    {
                        "key": "user_gender",
                        "value": registerData.registerGender
                    },
                    {
                        "key": "user_phone",
                        "value": registerData.registerPhone
                    }
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
                            text={t('common:register_success')}
                            error={errors.registerGender ? errors.registerGender.message : ''}
            />
            <form onSubmit={handleRegisterSubmit(registerHandleSubmit)}>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <div className={RegisterFormStyle.FullName + ' ' + RegisterFormStyle.Filed} style={{marginTop: Object.keys(errors).length !== 0 ? '20px' : 0}}>
                            <small>{errors.first_name && errors.first_name.message}</small>
                            <input
                                placeholder={t('common:full_name')}
                                type="text"
                                name='first_name'
                                {...handleRegisterRegister('first_name')}
                                style={{borderColor: errors.first_name ? '#ff0000' : 'transparent'}}
                            />
                            <div className={RegisterFormStyle.GenderBlock + ' ' + RegisterFormStyle.Filed}>
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
                            errors.registerDate ? RegisterFormStyle.DatePicker + ' ' + RegisterFormStyle.Filed + ' ' + RegisterFormStyle.DatePickerWithError : RegisterFormStyle.DatePicker + ' ' + RegisterFormStyle.Filed
                        } style={{marginTop: Object.keys(errors).length !== 0 ? '20px' : 0}}>
                            <small>{errors.registerDate && errors.registerDate.message}</small>
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
                <div className={RegisterFormStyle.Filed} style={{marginTop: Object.keys(errors).length !== 0 ? '20px' : 0}}>
                    <small>{errors.email && errors.email.message}</small>
                    <input
                        placeholder={t('common:email')}
                        type='email'
                        name='email'
                        {...handleRegisterRegister('email')}
                        defaultValue={currentUser ? currentUser.email : ''}
                        style={{borderColor: errors.email ? '#ff0000' : 'transparent'}}
                    />
                </div>

                <div className={RegisterFormStyle.Filed} style={{marginTop: Object.keys(errors).length !== 0 ? '20px' : 0}}>
                    <small>{errors.registerPhone && errors.registerPhone.message}</small>
                    <input
                        placeholder={t('common:phone_number')}
                        type="tel"
                        name='registerPhone'
                        {...handleRegisterRegister('registerPhone')}
                        defaultValue={currentUser ? currentUser.phone : ''}
                        style={{borderColor: errors.registerPhone ? '#ff0000' : 'transparent'}}
                    />
                </div>

                <div className={RegisterFormStyle.Filed} style={{marginTop: Object.keys(errors).length !== 0 ? '20px' : 0}}>
                    <small>{errors.password && errors.password.message}</small>
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
                </div>

                <div className={RegisterFormStyle.Filed} style={{marginTop: Object.keys(errors).length !== 0 ? '40px' : 0}}>
                    <small>{errors.registerConfirmPassword && errors.registerConfirmPassword.message}</small>
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
                </div>


                <div style={{textAlign: 'right'}}>
                    <Button type={'submit'} text={t('common:submit')}/>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
