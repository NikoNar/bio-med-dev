import React from 'react';
import Link from "next/link";
import Button from "../../Button/Button";
import RegisterFormStyle from "../RegisterForm/register-form.module.scss";
import {loginUrl} from "../../../utils/url";
import {useRouter} from "next/router";
import {setCookie} from "nookies";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import useTranslation from "next-translate/useTranslation";






const LoginForm = () => {
    const {t} = useTranslation()
    const router = useRouter()

    const schema = Yup.object().shape({
        loginEmail: Yup.string().email(t('errors:email_format_error')).required(t('errors:enter_email')),
        loginPassword: Yup.string().min(4, t('errors:password_min_error')).max(10, t('errors:password_max_error')).required()
    })

    const {handleSubmit, register, formState: { errors }} = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });

    const handleSubmitLogin = async (loginData) => {

        await fetch(loginUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                const user = JSON.stringify(data.user)
                setCookie(null, 'currentUser', user)
                setCookie(null, 'token', data.access_token)
                router.push('/profile')
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div className={RegisterFormStyle.Register}>
            <form onSubmit={handleSubmit(handleSubmitLogin)}>
                <input
                    placeholder={t('common:mail_or_phone_number')}
                    type="text"
                    name="loginEmail"
                    {...register("loginEmail")}
                />
                {errors.loginEmail &&
                <div className={'error'}>
                    <p style={{color: '#ff0000'}}>
                        {errors.loginEmail.message}
                    </p>
                </div>
                }
                <input
                    placeholder={t('common:password')}
                    type="password"
                    name="loginPassword"
                    {...register("loginPassword")}
                />
                {errors.loginPassword &&
                <div className={'error'}>
                    <p style={{color: '#ff0000'}}>
                    {errors.loginPassword.message}
                    </p>
                </div>
                }
                <Link href={'#'}>
                    <a>{t('common:forgot_password')}</a>
                </Link>
                <Button type={'submit'} text={t('common:login')}/>
            </form>
        </div>
    );
};

export default LoginForm;