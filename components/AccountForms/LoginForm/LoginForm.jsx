import React, {useState} from 'react';
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
import ModalComponent from "../../Alerts/Modal/ModalComponent";
import RequiredFields from "../../Alerts/RequiredFields/RequiredFields";




const schema = Yup.object().shape({
    loginEmail: Yup.string().email().required(),
    loginPassword: Yup.string().min(4).max(10).required()
})


const LoginForm = () => {

    const [isOpen, setIsOpen] = useState(false)

    const {t} = useTranslation()
    const router = useRouter()

    const {handleSubmit, register, formState: { errors }} = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });

    const [error, setError] = useState('')

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
                if (data.user){
                    setCookie(null, 'currentUser', user)
                    setCookie(null, 'token', data.access_token)
                    router.push('/profile')
                }else {
                    setError(t('errors:login_or_password_error'))
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
                <input
                    placeholder={t('common:mail_or_phone_number')}
                    type="text"
                    name="loginEmail"
                    {...register("loginEmail")}
                    style={{borderColor: errors.loginEmail ? '#ff0000' : 'transparent'}}
                />
                <input
                    placeholder={t('common:password')}
                    type="password"
                    name="loginPassword"
                    {...register("loginPassword")}
                    style={{borderColor: errors.loginPassword ? '#ff0000' : 'transparent'}}
                />
                <Link href={'#'}>
                    <a>{t('common:forgot_password')}</a>
                </Link>
                <Button type={'submit'} text={t('common:login')}/>
            </form>
            <ModalComponent error={error} isOpen={isOpen} callBack={()=>setIsOpen(false)}/>
        </div>
    );
};

export default LoginForm;