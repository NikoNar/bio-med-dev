import React from 'react';
import Button from "../../components/Button/Button";
import RegisterFormStyle from "../../components/AccountForms/RegisterForm/register-form.module.scss";
import FPStyle from './forgot-password.module.scss'
import * as Yup from 'yup'
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import RequiredFields from "../../components/Alerts/RequiredFields/RequiredFields";
import ContactFrom from "../../components/ContactUs/ContactForm/ContactFrom";
import ContactUs from "../../components/ContactUs/ContactUs";
import {contactInfoUrl} from "../../utils/url";

const schema = Yup.object().shape({
    email: Yup.string().email().required()
})


const ForgotPassword = ({contactInfo}) => {

    const {handleSubmit, register, formState: {errors}} = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema)
    })

    const handlePasswordEmail = (data) => {
        console.log(data);
    }

    return (
        <>
            <section className={RegisterFormStyle.Register + ' ' + FPStyle.Section}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-lg-6'}>
                            <div className={'pb-5'}>
                                <h4>Մոռացել եք Ձեր գաղտնաբառը?</h4>
                                <small>Մուտքագրեք Ձեր էլ հասցեն, գաղտնաբառը վերականգնելու համար</small>
                            </div>
                            <RequiredFields errors={errors}/>
                            <form onSubmit={handleSubmit(handlePasswordEmail)}>
                                <input
                                    type="email"
                                    name="email"
                                    {...register("email")}
                                    style={{borderColor: errors.email ? '#ff0000' : 'transparent'}}
                                />
                                <div style={{textAlign: 'right'}}>
                                    <Button callBack={(e) => handlePasswordEmail(e)} type={'submit'} text={'Submit'}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ContactUs contactInfo={contactInfo}/>
        </>
    );
};


export async function getServerSideProps(ctx) {

    const contactInfo = await fetch(contactInfoUrl, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    return {
        props: {contactInfo},
    }
}

export default ForgotPassword;