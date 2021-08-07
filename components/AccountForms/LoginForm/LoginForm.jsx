import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Button from "../../Button/Button";
import RegisterFormStyle from "../RegisterForm/register-form.module.scss";
import {editProfileUrl, loginUrl} from "../../../utils/url";
import {useRouter} from "next/router";
import {setCookie} from "nookies";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import useTranslation from "next-translate/useTranslation";
import ModalComponent from "../../Alerts/Modal/ModalComponent";
import RequiredFields from "../../Alerts/RequiredFields/RequiredFields";







const LoginForm = () => {
    const {t} = useTranslation()
    const nameRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const schema = Yup.object().shape({
        username: Yup.string().matches(nameRegex, t('errors:language_error')).required(t('errors:login_error')),
        password: Yup.string().min(6, t('errors:password_min_error')).max(16, t('errors:password_max_error')).required()
    })

    const [isOpen, setIsOpen] = useState(false)


    const router = useRouter()

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const {handleSubmit, register, formState: { errors }} = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });

    const [error, setError] = useState('')

    const handleSubmitLogin = async (loginData) => {
        await fetch(`${loginUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
            .then(res => res.json())
            .then(data => {
                if (!data.message){
                    setCookie(null, 'token', data.token)
                    fetch(`${editProfileUrl}/${data.user_id}?${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`)
                        .then(res=>res.json())
                        .then(data=>{
                            const user = JSON.stringify(data)
                            setCookie(null, 'currentUser', user)
                            router.push('/profile')
                        })
                }else {
                    setError(data.message)
                    setIsOpen(true)
                }
            })
            .catch(error => {
                console.error(error)
            })
    }





    return (
        <div className={RegisterFormStyle.Register}>

            <RequiredFields errors={errors}/>
            <form onSubmit={handleSubmit(handleSubmitLogin)}>
                <div className={RegisterFormStyle.Filed} style={{marginTop: Object.keys(errors).length !== 0 ? '40px' : 0}}>
                    <small>{errors.username && errors.username.message}</small>
                    <input
                        placeholder={t('common:mail_or_phone_number')}
                        type="text"
                        name="username"
                        {...register("username")}
                        style={{borderColor: errors.username ? '#ff0000' : 'transparent'}}
                    />
                </div>
                <div className={RegisterFormStyle.Filed} style={{marginTop: Object.keys(errors).length !== 0 ? '20px' : 0}}>
                    <small>{errors.password && errors.password.message}</small>
                    <input
                        placeholder={t('common:password')}
                        type="password"
                        name="password"
                        {...register("password")}
                        style={{borderColor: errors.password ? '#ff0000' : 'transparent'}}
                    />
                </div>

                <Link href={'/forgot-password'}>
                    <a>{t('common:forgot_password')}</a>
                </Link>
                <Button type={'submit'} text={t('common:login')}/>
            </form>
            <ModalComponent error={error} isOpen={isOpen} callBack={()=>setIsOpen(false)}/>
        </div>
    );
};

export default LoginForm;
