import React, {useEffect, useState} from 'react';
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
    username: Yup.string().required(),
    password: Yup.string().min(4).max(10).required()
})


const LoginForm = () => {

    const [isOpen, setIsOpen] = useState(false)

    const {t} = useTranslation()
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
                const user = JSON.stringify(data)
                console.log(data);
                if (!data.message){
                    setCookie(null, 'currentUser', user)
                    setCookie(null, 'token', data.token)
                    router.push('/profile')
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
                <input
                    placeholder={t('common:mail_or_phone_number')}
                    type="text"
                    name="username"
                    {...register("username")}
                    style={{borderColor: errors.username ? '#ff0000' : 'transparent'}}
                />
                <input
                    placeholder={t('common:password')}
                    type="password"
                    name="password"
                    {...register("password")}
                    style={{borderColor: errors.password ? '#ff0000' : 'transparent'}}
                />
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