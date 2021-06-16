import React, {useState} from 'react';
import Button from "../../Button/Button";
import {contactFormMessageUrl} from "../../../utils/url";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import useTranslation from "next-translate/useTranslation";
import RequiredFields from "../../Alerts/RequiredFields/RequiredFields";



const ContactFrom = () => {

    const {t} = useTranslation()

    const contactUsFormSchema = Yup.object().shape({
        messageAuthor: Yup.string().matches(/^([^1-9]*)$/).required(),
        messageAuthorEmail: Yup.string().email().required(),
        messageBody: Yup.string().required(),
    })

    const {
        handleSubmit: contactUsHandleSubmit,
        register: contactUsRegister,
        formState: {errors},
        reset: contactUsFormReset
    } = useForm(
        {
            mode: 'onBlur',
            resolver: yupResolver(contactUsFormSchema)
        }
    );


    const handleSubmitMessage = async (messageData) => {

        await fetch(contactFormMessageUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageData)
        })
            .then(res => {
                res.json()
                contactUsFormReset({})
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <>
            <RequiredFields errors={errors}/>
            <form onSubmit={contactUsHandleSubmit(handleSubmitMessage)}>
                <input
                    type="text"
                    name="messageAuthor"
                    placeholder={t('common:full_name')}
                    {...contactUsRegister("messageAuthor")}
                    style={{borderColor: errors.messageAuthor ? '#ff0000' : 'transparent'}}
                />

                <input
                    type="email"
                    name="messageAuthorEmail"
                    placeholder={t('common:email')}
                    {...contactUsRegister("messageAuthorEmail")}
                    style={{borderColor: errors.messageAuthorEmail ? '#ff0000' : 'transparent'}}
                />

                <textarea
                    name="messageBody"
                    placeholder={t('common:your_message')}
                    {...contactUsRegister("messageBody")}
                    style={{borderColor: errors.messageBody ? '#ff0000' : 'transparent'}}
                />
                <Button type={'submit'} text={t('common:send')}/>
            </form>
        </>
    );
};

export default ContactFrom;