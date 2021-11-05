import React from 'react';
import {
    aboutUsUrl, allPagesUrl,
    analyzesCategoryUrl,
    analyzesUrl,
    contactInfoUrl, locationsUrl,
    slidesUrl,
} from "../utils/url";
import TabComponent from "../components/Tab/Tab";
import MainSlider from "../components/MainSlider/MainSlider";
import Researches from "../components/Researches/Researches";
import AboutUsSection from "../components/AboutUsSection/AboutUsSection";
import dynamic from 'next/dynamic'

const ContactUs = dynamic(() => import("../components/ContactUs/ContactUs"), {ssr: false})

import {resetIdCounter} from "react-tabs";



const Home = ({ slides, categories, t, loc, analyzes, contactInfo, contactPageInfo, aboutUsContent, researches}) => {
    const researchesArr = researches.filter((el)=>{
        return el.slug === 'sales' || el.slug === 'appointment' || el.slug === 'call-home'
    })

    const initId = categories[0] ? categories[0].id : ''
    return (
        <>
            <MainSlider slides={slides}/>
            <TabComponent categories={categories} t={t} loc={loc} initId={initId} analyzes={analyzes}/>
            <Researches researches={researchesArr}/>
            <AboutUsSection aboutUs={aboutUsContent}/>
            <ContactUs contactInfo={contactInfo} t={t} contactPageInfo={contactPageInfo}/>
        </>
    );
};


export async function getServerSideProps(ctx) {

    resetIdCounter();

    const categories = await fetch(`${analyzesCategoryUrl}?${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&parent=0&orderby=slug`)
        .then(res => res.json())
        .then(data => data.reverse())

    const analyzes = await fetch(`${analyzesUrl}?${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&category=${categories[0] ? categories[0].id : ''}&tag=266`)
    .then(res=>res.json())
    .then(data=>data)

    const slides = await fetch(`${slidesUrl}?${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}&_embed`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    const aboutUsContent = await fetch(`${aboutUsUrl}&${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}&_embed`)
    .then(res => res.json())
    .then(dataOne => {
        let id = dataOne[0].metadata.image;
      
        fetch('https://admin.biomed.am/wp-json/wp/v2/media/'+ id)
        .then(res => res.json())
        .then(data => {
            dataOne[0].metadata.image = data.guid.rendered;   
        })
    
        return dataOne;

    });

    const researches = await fetch(`${allPagesUrl}&${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}&_embed&per_page=20`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    const contactInfo = await fetch(`${locationsUrl}?status=publish&${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}`)
        .then(res => res.json())
        .then(data => data)

    const contactPageInfo = await fetch(`${contactInfoUrl}&${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)



    return {
        props: {
            slides,
            researches,
            aboutUsContent,
            contactInfo,
            categories: categories,
            analyzes,
            contactPageInfo,
        },
    }
}


export default Home;

