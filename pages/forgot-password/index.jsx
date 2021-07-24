import React from 'react';
import Button from "../../components/Button/Button";
import RegisterFormStyle from "../../components/AccountForms/RegisterForm/register-form.module.scss";
import FPStyle from './forgot-password.module.scss'
import * as Yup from 'yup'
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import RequiredFields from "../../components/Alerts/RequiredFields/RequiredFields";
import {contactInfoUrl} from "../../utils/url";
import useTranslation from "next-translate/useTranslation";

const schema = Yup.object().shape({
    email: Yup.string().email().required()
})


const ForgotPassword = () => {

    const {t} = useTranslation()


    const {handleSubmit, register, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const handlePasswordEmail = (data) => {

    }

    return (
        <>
            <section className={RegisterFormStyle.Register + ' ' + FPStyle.Section}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-lg-6'}>
                            <div className={'pb-5'}>
                                <h4>{t('common:forgot_password')}</h4>
                                <small>{t('common:enter_your_password_recovery_email')}</small>
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
           {/* <ContactUs contactInfo={contactInfo}/>*/}
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
