import React, {useState} from 'react';
import Link from "next/link";
import Button from "../../Button/Button";
import RegisterFormStyle from "../RegisterForm/register-form.module.scss";
import {loginUrl} from "../../../utils/url";
import {useRouter} from "next/router";
import {setCookie} from "nookies";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from 'yup';


const schema = Yup.object().shape({
    loginEmail: Yup.string().email('Մուտքագրած էլ․ հասցեն պետք է լինի հետևյալ ֆորմատով (test@test.am)').required('Մուտքագրեք Ձեև էլ․ հասցեն'),
    password: Yup.string().min(4, 'Գաղտնաբառը պետք է պարունակի առնվազն 4 նիշ').max(10, 'Գաղտնաբառը պետք է պարունակի առավելագույնը 10 նիշ').required()
})



const LoginForm = () => {

    const router = useRouter()

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
                data.access_token && setCookie(null, 'currentUser', user)
                data.access_token && setCookie(null, 'token', data.access_token)
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
                    placeholder="էլ հասցե կամ հեռախոսի համար*"
                    type="text"
                    name="loginEmail"
                    {...register("email")}
                />
                {errors.loginEmail &&
                <div className={'error'}>
                    <p style={{color: '#ff0000'}}>
                        {errors.loginEmail.message}
                    </p>
                </div>
                }
                <input
                    placeholder="Գաղտնաբառ*"
                    type="password"
                    name="password"
                    {...register("password")}
                />
                {errors.password &&
                <div className={'error'}>
                    <p style={{color: '#ff0000'}}>
                    {errors.password.message}
                    </p>
                </div>
                }
                <Link href={'#'}>
                    <a>Մոռացել եք Ձեր գաղտնաբառը?</a>
                </Link>
                <Button type={'submit'} text={'Մուտք'}/>
            </form>
        </div>
    );
};

export default LoginForm;