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
        fullname: Yup.string().required(),
        email: Yup.string().email().required(),
        message: Yup.string().required(),
    })

    const {
        handleSubmit: contactUsHandleSubmit,
        register: contactUsRegister,
        formState: {errors},
        reset: contactUsFormReset
    } = useForm(
        {
            resolver: yupResolver(contactUsFormSchema)
        }
    );

    const handleSubmitMessage = async (messageData) => {
        console.log(messageData);
        await fetch('https://biomed.codemanstudio.com/wp-json/contact-form-7/v1/contact-forms/236/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
            },
            body: JSON.stringify(messageData)
        })
            .then(res => {
                console.log(res.json());
            })
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
                    name="fullname"
                    placeholder={t('common:full_name')}
                    {...contactUsRegister("fullname")}
                    style={{borderColor: errors.fullname ? '#ff0000' : 'transparent'}}
                />

                <input
                    type="email"
                    name="email"
                    placeholder={t('common:email')}
                    {...contactUsRegister("email")}
                    style={{borderColor: errors.email ? '#ff0000' : 'transparent'}}
                />

                <textarea
                    name="message"
                    placeholder={t('common:your_message')}
                    {...contactUsRegister("message")}
                    style={{borderColor: errors.message ? '#ff0000' : 'transparent'}}
                />
                <Button type={'submit'} text={t('common:send')}/>
            </form>
        </>
    );
};

export default ContactFrom;
