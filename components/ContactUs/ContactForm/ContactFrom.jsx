import React, {useState} from 'react';
import Button from "../../Button/Button";
import {contactFormMessageUrl} from "../../../utils/url";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const contactUsFormSchema = Yup.object().shape({
    messageAuthor: Yup.string().matches(/^([^1-9]*)$/, 'Անունը պետք է պարունակի միայն տառեր').required('Մուտքագրեք Ձեև անունը և ազգանունը'),
    messageAuthorEmail: Yup.string().email('Մուտքագրած էլ․ հասցեն պետք է լինի հետևյալ ֆորմատով (test@test.am)').required('Մուտքագրեք Ձեև էլ․ հասցեն'),
    messageBody: Yup.string().required('Դուք չեք կարող ւղարկել դատարկ հաղորդագրություն'),
})

const ContactFrom = () => {

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
        console.log(messageData);
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
                placeholder="Անուն Ազգանուն*"
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
                placeholder="էլ հասցե*"
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
                placeholder="Տեքստ*"
                {...contactUsRegister("messageBody")}
            />
            {errors.messageBody &&
            <div className={'error'}>
                <p style={{color: '#ff0000', margin: 0}}>
                    {errors.messageBody.message}
                </p>
            </div>
            }
            <Button type={'submit'} text={'ՈՒղարկել'}/>
        </form>
    );
};

export default ContactFrom;