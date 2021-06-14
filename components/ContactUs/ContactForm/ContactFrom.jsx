import React, {useState} from 'react';
import Button from "../../Button/Button";
import {contactFormMessageUrl} from "../../../utils/url";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import useTranslation from "next-translate/useTranslation";



const ContactFrom = () => {

    const {t} = useTranslation()

    const contactUsFormSchema = Yup.object().shape({
        messageAuthor: Yup.string().matches(/^([^1-9]*)$/, t('errors:name_format_error')).required(t('errors:name_error')),
        messageAuthorEmail: Yup.string().email(t('errors:email_format_error')).required(t('errors:enter_email')),
        messageBody: Yup.string().required(t('errors:empty_message_error')),
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
        <form onSubmit={contactUsHandleSubmit(handleSubmitMessage)}>
            <input
                type="text"
                name="messageAuthor"
                placeholder={t('common:full_name')}
                {...contactUsRegister("messageAuthor")}
            />
            {errors.messageAuthor &&
            <div className={'error'}>
                <p style={{color: '#ff0000', margin: 0}}>
                    {errors.messageAuthor.message}
                </p>
            </div>
            }
            <input
                type="email"
                name="messageAuthorEmail"
                placeholder={t('common:email')}
                {...contactUsRegister("messageAuthorEmail")}
            />
            {errors.messageAuthorEmail &&
            <div className={'error'}>
                <p style={{color: '#ff0000', margin: 0}}>
                    {errors.messageAuthorEmail.message}
                </p>
            </div>
            }
            <textarea
                name="messageBody"
                placeholder={t('common:your_message')}
                {...contactUsRegister("messageBody")}
            />
            {errors.messageBody &&
            <div className={'error'}>
                <p style={{color: '#ff0000', margin: 0}}>
                    {errors.messageBody.message}
                </p>
            </div>
            }
            <Button type={'submit'} text={t('common:send')}/>
        </form>
    );
};

export default ContactFrom;