import React from 'react';
import LoginFormStyle from './login-form.module.scss'
import Link from "next/link";
import Button from "../../Button/Button";
import RegisterFormStyle from "../RegisterForm/register-form.module.scss";

const LoginForm = () => {
    return (
            <div className={RegisterFormStyle.Register}>
                <form action="">
                    <input placeholder="էլ հասցե կամ հեռախոսի համար*" type="text" required/>
                    <input placeholder="Գաղտնաբառ*" type="password" required/>
                    <Link href={'#'}>
                        <a>Մոռացել եք Ձեր գաղտնաբառը?</a>
                    </Link>
                    <Button type={'submit'} text={'Մուտք'}/>
                </form>
            </div>
    );
};

export default LoginForm;