import React, {useState} from 'react';
import Button from "../../Button/Button";
import {contactFormMessageUrl} from "../../../utils/url";



const ContactFrom = () => {

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userMessage, setUserMessage] = useState('')


    const handleUserName = (e)=>{
        setUserName(e.target.value)
    }

    const handleUserEmail = (e)=>{
        setUserEmail(e.target.value)
    }

    const handleUserMessage = (e)=>{
        setUserMessage(e.target.value)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const data = {
            fullName: userName,
            email: userEmail,
            message: userMessage
        }

        await fetch(contactFormMessageUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res=>res.json())
            .then(data=>data)
            .then(()=>{
                setUserName('')
                setUserEmail('')
                setUserMessage('')
            })
            .catch((err)=>{
                console.log(err)
            })
    }


    return (
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" placeholder="Անուն Ազգանուն*" value={userName ? userName : ''} required onChange={(e)=>handleUserName(e)}/>
            <input type="email" placeholder="էլ հասցե*" value={userEmail ? userEmail : ''} required onChange={(e)=>handleUserEmail(e)}/>
            <textarea name="" placeholder="Տեքստ*" value={userMessage ? userMessage : ''} required onChange={(e)=>handleUserMessage(e)}> </textarea>
            <Button type={'submit'} text={'ՈՒղարկել'}/>
        </form>
    );
};

export default ContactFrom;