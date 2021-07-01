import React, {useEffect, useState} from 'react';
import {aboutUsTextUrl, analyzesCategoryUrl, analyzesUrl, contactInfoUrl, researchesUrl, slidesUrl} from "../utils/url";
import TabComponent from "../components/Tab/Tab";
import MainSlider from "../components/MainSlider/MainSlider";
import Researches from "../components/Researches/Researches";
import AboutUsSection from "../components/AboutUsSection/AboutUsSection";
import dynamic from 'next/dynamic'

const ContactUs = dynamic(() => import("../components/ContactUs/ContactUs"), {ssr: false})
import {resetIdCounter} from "react-tabs";


const Home = ({ slides, categories, t, loc, analyzes}) => {

    const initId = categories && categories[0].id

    return (
        <>
            <MainSlider slides={slides}/>
            <TabComponent categories={categories} t={t} loc={loc} initId={initId} analyzes={analyzes}/>
            {/*<Researches researches={researches}/>
            <AboutUsSection aboutUs={aboutUs}/>
            <ContactUs contactInfo={contactInfo}/>*/}
        </>
    );
};


export async function getServerSideProps(ctx) {

    resetIdCounter();

    const categories = await fetch(analyzesCategoryUrl + `?lang=${ctx.locale}` + `&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&parent=0&orderby=slug`)
        .then(res => res.json())
        .then(data => data)

    const analyzes = await fetch(analyzesUrl +
        `?lang=${ctx.locale}` +
        `&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`+
        `&category=${categories[0].id}`)
        .then(res=>res.json())
        .then(data=>data)

    const slides = await fetch(slidesUrl + `?lang=${ctx.locale}` + `&_embed`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    /*const researches = await fetch(researchesUrl, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)*/

    /*const aboutUs = await fetch(aboutUsTextUrl, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)*/

    /*const contactInfo = await fetch(contactInfoUrl, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)*/



    return {
        props: {
            slides,
            //researches,
            //aboutUs,
            // contactInfo,
            categories: categories,
            analyzes
        },
    }
}


export default Home;

