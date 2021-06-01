import React, {useState} from 'react';
import Link from "next/link";
import Button from "../../Button/Button";
import RegisterFormStyle from "../RegisterForm/register-form.module.scss";
import {loginUrl} from "../../../utils/url";
import {useRouter} from "next/router";
import {setCookie} from "nookies";

const LoginForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const data = {
        email,
        password
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        await fetch(loginUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res=>res.json())
            .then(data=>{
                const user = JSON.stringify(data.user)

                fetch('/api/login', {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({token: data.access_token})
                })
               setCookie(null, 'currentUser', user)
            })
            .then(()=>router.push('/profile'))
    }

    const handleEmail = (e)=>{
        setEmail(e.target.value)
    }

    const handlePassword = (e)=>{
        setPassword(e.target.value)
    }




    return (
            <div className={RegisterFormStyle.Register}>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <input placeholder="էլ հասցե կամ հեռախոսի համար*" type="text" onChange={(e)=>handleEmail(e)} required/>
                    <input placeholder="Գաղտնաբառ*" type="password" onChange={(e)=>handlePassword(e)} required/>
                    <Link href={'#'}>
                        <a>Մոռացել եք Ձեր գաղտնաբառը?</a>
                    </Link>
                    <Button type={'submit'} text={'Մուտք'}/>
                </form>
            </div>
    );
};

export default LoginForm;