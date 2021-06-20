import React from 'react';
import {contactInfoUrl} from "../../utils/url";
import dynamic from 'next/dynamic'
const ContactUs = dynamic(()=>import("../../components/ContactUs/ContactUs"), {ssr:false}) //from "../../components/ContactUs/ContactUs";


const ContactUsPage = ({contactInfo}) => {
    return (
        <ContactUs contactInfo={contactInfo}/>
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

export default ContactUsPage;