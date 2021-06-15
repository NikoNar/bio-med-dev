import React, {useEffect, useState} from 'react';
import RegisterFormStyle from './register-form.module.scss'
import Button from "../../Button/Button";
import DatePicker from 'react-datepicker'
import {registerUrl} from "../../../utils/url";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {parsePhoneNumberFromString} from 'libphonenumber-js'
import * as Yup from 'yup';
import useTranslation from "next-translate/useTranslation";
import RequiredFields from "../../Alerts/RequiredFields/RequiredFields";


const registerSchema = Yup.object().shape({
    registerFullName: Yup.string().matches(/^([^1-9]*)$/).required(),
    registerGender: Yup.string().nullable(true).required(),
    registerDate: Yup.string().required(),
    registerEmail: Yup.string().email().required(),
    registerPhone: Yup.string().required(),
    registerPassword: Yup.string().min(4).max(10).required(),
    registerConfirmPassword: Yup.string().oneOf([Yup.ref('registerPassword'), null])
})


const RegisterForm = ({security, currentUser}) => {

    const {t} = useTranslation()

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
            resolver: yupResolver(registerSchema && registerSchema)
        }
    );



    const registerHandleSubmit = async (registerData) => {
        await fetch(registerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        })
            .then(res => {
                    res.json()
                    registerFormReset({})
                }
            )

    }

    const validatePhoneNumber = (value)=>{
        const phoneNumber = parsePhoneNumberFromString(value)
        if (!phoneNumber){
            return value
        }

        return phoneNumber.formatInternational()

    }

    return (
        <div className={RegisterFormStyle.Register}>
            <RequiredFields errors={errors}/>
            <form onSubmit={handleRegisterSubmit(registerHandleSubmit)}>
                <div className={RegisterFormStyle.FullName}>
                    <div className={'row'}>
                        <div className={'col-8'}>
                            <input
                                placeholder={t('common:full_name')}
                                type="text"
                                name='registerFullName'
                                {...handleRegisterRegister('registerFullName')}
                                style={{borderColor: errors.registerFullName ? '#ff0000' : 'transparent'}}
                            />

                        </div>
                        <div className={'col-4'}>
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
                    name='registerEmail'
                    {...handleRegisterRegister('registerEmail')}
                    defaultValue={currentUser ? currentUser.email : ''}
                    style={{borderColor: errors.registerEmail ? '#ff0000' : 'transparent'}}
                />

                <input
                    placeholder={t('common:phone_number')}
                    type="tel"
                    name='registerPhone'
                    {...handleRegisterRegister('registerPhone')}
                    defaultValue={currentUser ? currentUser.phone : ''}
                    onChange={(event)=>{
                        event.target.value = validatePhoneNumber(event.target.value)
                    }}
                    style={{borderColor: errors.registerPhone ? '#ff0000' : 'transparent'}}
                />

                <input
                    placeholder={t('common:password')}
                    type="password"
                    name='registerPassword'
                    {...handleRegisterRegister('registerPassword')}
                    style={{display: security ? 'none' : 'block', borderColor: errors.registerPassword ? '#ff0000' : 'transparent'}}
                />

                <input
                    placeholder={t('common:confirm_password')}
                    type="password"
                    name='registerConfirmPassword'
                    {...handleRegisterRegister('registerConfirmPassword')}
                    style={{display: security ? 'none' : 'block', borderColor: errors.registerConfirmPassword ? '#ff0000' : 'transparent'}}
                />

                <div style={{textAlign: 'right'}}>
                    <Button type={'submit'} text={t('common:submit')}/>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;