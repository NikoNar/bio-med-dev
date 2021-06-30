import React from 'react';
import {aboutUsTextUrl, analyzesCategoryUrl, analyzesUrl, contactInfoUrl, researchesUrl, slidesUrl} from "../utils/url";
import TabComponent from "../components/Tab/Tab";
import MainSlider from "../components/MainSlider/MainSlider";
import Researches from "../components/Researches/Researches";
import AboutUsSection from "../components/AboutUsSection/AboutUsSection";
import dynamic from 'next/dynamic'

const ContactUs = dynamic(() => import("../components/ContactUs/ContactUs"), {ssr: false})
import {resetIdCounter} from "react-tabs";


const Home = ({analyzes, slides, categories, t}) => {
    return (
        <>
            <MainSlider slides={slides}/>
            <TabComponent analyzes={analyzes} categories={categories} t={t}/>
            {/*<Researches researches={researches}/>
            <AboutUsSection aboutUs={aboutUs}/>
            <ContactUs contactInfo={contactInfo}/>*/}
        </>
    );
};


export async function getServerSideProps(ctx) {

    resetIdCounter();

    const analyzes = await fetch(analyzesUrl + `?lang=${ctx.locale}` + '&consumer_key=ck_a47e7fe464749514bb12d991f377ca074edf2f93&consumer_secret=cs_537e132ca0f429c320cf6a51c29332a9409d5432', {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

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

    const categories = await fetch(analyzesCategoryUrl + `?lang=${ctx.locale}` + `&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&parent=0`)
        .then(res => res.json())
        .then(data => data)

    return {
        props: {
            analyzes,
            slides,
            //researches,
            //aboutUs,
            // contactInfo,
            categories: categories
        },
    }
}


export default Home;

