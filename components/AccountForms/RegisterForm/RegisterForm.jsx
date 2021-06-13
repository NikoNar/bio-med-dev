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


const registerSchema = Yup.object().shape({
    registerFullName: Yup.string().matches(/^([^1-9]*)$/, 'Անունը պետք է պարունակի միայն տառեր').required('Մուտքագրեք Ձեր անունը և ազգանունը'),
    registerGender: Yup.string().nullable(true).required('Ընտրեք Ձեր սեռը'),
    registerDate: Yup.string().required('Մուտքագրեք Ձեր ծննդյան ամսաթիվը'),
    registerEmail: Yup.string().email('Մուտքագրած էլ․ հասցեն պետք է լինի հետևյալ ֆորմատով (test@test.am)').required('Մուտքագրեք Ձեր էլ․ հասցեն'),
    registerPhone: Yup.string().required('Մուտքագրեք Ձեր էլ․ հեռահոասահամարը'),
    registerPassword: Yup.string().min(4, 'Գաղտնաբառը պետք է պարունակի առնվազն 4 նիշ').max(10, 'Գաղտնաբառը պետք է պարունակի առավելագույնը 10 նիշ').required(),
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
            resolver: yupResolver(registerSchema)
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
            <form onSubmit={handleRegisterSubmit(registerHandleSubmit)}>
                <div className={RegisterFormStyle.FullName}>
                    <div className={'row'}>
                        <div className={'col-8'}>
                            <input
                                placeholder={t('common:full_name')}
                                type="text"
                                name='registerFullName'
                                {...handleRegisterRegister('registerFullName')}
                            />
                            {errors.registerFullName &&
                            <div className={'error mt-3'}>
                                <p style={{color: '#ff0000'}}>
                                    {errors.registerFullName.message}
                                </p>
                            </div>
                            }
                        </div>
                        <div className={'col-4'}>
                            <div className={RegisterFormStyle.GenderBlock}>
                                <label htmlFor="male" className={RegisterFormStyle.MaleActive}>
                                    <input
                                        type="radio"
                                        id="male"
                                        value='male'
                                        {...handleRegisterRegister('registerGender')}
                                    />
                                    <span className="_icon-male"></span>
                                </label>
                                <label htmlFor="female" className={RegisterFormStyle.FemaleActive}>
                                    <input
                                        type="radio"
                                        id="female"
                                        value='female'
                                        {...handleRegisterRegister('registerGender')}
                                    />
                                    <span className="_icon-female"></span>
                                </label>
                            </div>
                            {errors.registerGender &&
                            <div className={'error mt-3'}>
                                <p style={{color: '#ff0000'}}>
                                    {errors.registerGender.message}
                                </p>
                            </div>
                            }
                        </div>
                    </div>
                </div>
                <Controller
                    control={registerControl}
                    name="registerDate"
                    render={({field: {onChange, value}}) => (
                        <div className={RegisterFormStyle.DatePicker}>
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
                {errors.registerDate &&
                <div className={'error'}>
                    <p style={{color: '#ff0000'}}>
                        {errors.registerDate.message}
                    </p>
                </div>
                }

                <input
                    placeholder={t('common:email')}
                    type='email'
                    name='registerEmail'
                    {...handleRegisterRegister('registerEmail')}
                    defaultValue={currentUser ? currentUser.email : ''}
                />
                {errors.registerEmail &&
                <div className={'error'}>
                    <p style={{color: '#ff0000'}}>
                        {errors.registerEmail.message}
                    </p>
                </div>
                }
                <input
                    placeholder={t('common:phone_number')}
                    type="tel"
                    name='registerPhone'
                    {...handleRegisterRegister('registerPhone')}
                    defaultValue={currentUser ? currentUser.phone : ''}
                    onChange={(event)=>{
                        event.target.value = validatePhoneNumber(event.target.value)
                    }}
                />
                {errors.registerPhone &&
                <div className={'error'}>
                    <p style={{color: '#ff0000'}}>
                        {errors.registerPhone.message}
                    </p>
                </div>
                }
                <input
                    placeholder={t('common:password')}
                    type="password"
                    name='registerPassword'
                    {...handleRegisterRegister('registerPassword')}
                    style={{display: security ? 'none' : 'block'}}
                />
                {errors.registerPassword &&
                <div className={'error'}>
                    <p style={{color: '#ff0000'}}>
                        {errors.registerPassword.message}
                    </p>
                </div>
                }
                <input
                    placeholder={t('common:confirm_password')}
                    type="password"
                    name='registerConfirmPassword'
                    {...handleRegisterRegister('registerConfirmPassword')}
                    style={{display: security ? 'none' : 'block'}}
                />
                {errors.registerConfirmPassword &&
                <div className={'error'}>
                    <p style={{color: '#ff0000'}}>
                        {errors.registerConfirmPassword.message}
                    </p>
                </div>
                }
                <div style={{textAlign: 'right'}}>
                    <Button type={'submit'} text={t('common:submit')}/>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;