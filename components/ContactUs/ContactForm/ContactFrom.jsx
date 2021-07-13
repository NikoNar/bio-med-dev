import React, {useState} from 'react';
import Button from "../../Button/Button";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import useTranslation from "next-translate/useTranslation";
import RequiredFields from "../../Alerts/RequiredFields/RequiredFields";
import ModalComponent from "../../Alerts/Modal/ModalComponent";



const ContactFrom = () => {

    const {t} = useTranslation()
    const [error, setError] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [text, setText] = useState(null)

    const contactUsFormSchema = Yup.object().shape({
        messageAuthor: Yup.string().required(),
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
        await fetch('https://biomed.codemanstudio.com/wp-json/contact-form-7/v1/contact-forms/236/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullname: messageData.messageAuthor,
                email: messageData.messageAuthorEmail,
                message: messageData.messageBody
            })
        })
            .then(res => res.json())
            .then(data=>{
                data.message ? setError(data.message) : setText('Your message has been successfully sent')
                setIsOpen(true)
                contactUsFormReset({})
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const closeModal = ()=>{
        setIsOpen(false)
    }


    return (
        <>
            <RequiredFields errors={errors}/>
            <ModalComponent error={error} isOpen={isOpen} callBack={closeModal} text={text}/>
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
