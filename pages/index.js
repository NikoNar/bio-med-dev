import React from 'react';
import {aboutUsTextUrl, analyzesCategoryUrl, analyzesUrl, contactInfoUrl, researchesUrl, slidesUrl} from "../utils/url";
import TabComponent from "../components/Tab/Tab";
import MainSlider from "../components/MainSlider/MainSlider";
import Researches from "../components/Researches/Researches";
import AboutUsSection from "../components/AboutUsSection/AboutUsSection";
import dynamic from 'next/dynamic'

const ContactUs = dynamic(() => import("../components/ContactUs/ContactUs"), {ssr: false})
import {resetIdCounter} from "react-tabs";



const Home = ({analyzes, slides, researches, aboutUs, contactInfo, categories}) => {

    return (
        <>
            <MainSlider slides={slides}/>
            <TabComponent analyzes={analyzes} categories={categories}/>
            <Researches researches={researches}/>
            <AboutUsSection aboutUs={aboutUs}/>
            <ContactUs contactInfo={contactInfo}/>
        </>
    );
};


export async function getStaticProps(ctx) {
    resetIdCounter();
    const analyzes = await fetch(analyzesUrl, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    const slides = await fetch(slidesUrl, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    const researches = await fetch(researchesUrl, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    const aboutUs = await fetch(aboutUsTextUrl, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    const contactInfo = await fetch(contactInfoUrl, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    const categories = await fetch(analyzesCategoryUrl)
        .then(res=>res.json())
        .then(data=>data)


    return {
        props: {
            analyzes,
            slides,
            researches,
            aboutUs,
            contactInfo,
            categories
        },
    }
}


export default Home;

