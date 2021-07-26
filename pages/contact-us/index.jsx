import React from 'react';
import {contactInfoUrl, locationsUrl} from "../../utils/url";
import dynamic from 'next/dynamic'
const ContactUs = dynamic(()=>import("../../components/ContactUs/ContactUs"), {ssr:false}) //from "../../components/ContactUs/ContactUs";


const ContactUsPage = ({contactInfo, contactPageInfo, loc, t}) => {

    return (
        <ContactUs contactInfo={contactInfo} loc={loc} t={t} contactPageInfo={contactPageInfo}/>
    );
};

export async function getServerSideProps(ctx) {

    const contactPageInfo = await fetch(contactInfoUrl + `&lang=${ctx.locale}`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    const contactInfo = await fetch(`${locationsUrl}?status=publish&lang=${ctx.locale}`)
        .then(res => res.json())
        .then(data => data)


    return {
        props: {contactPageInfo, contactInfo},
    }
}

export default ContactUsPage;
