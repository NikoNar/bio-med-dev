import React from 'react';
import {aboutUsTextUrl, analyzesUrl, researchesUrl, slidesUrl} from "../utils/url";
import TabComponent from "../components/Tab/Tab";
import MainSlider from "../components/MainSlider/MainSlider";
import Researches from "../components/Researches/Researches";
import AboutUsSection from "../components/AboutUsSection/AboutUsSection";
import ContactUs from "../components/ContactUs/ContactUs";


const Home = ({analyzes, slides, researches, aboutUs}) => {

    return (
        <>
            <MainSlider slides={slides}/>
            <TabComponent analyzes={analyzes}/>
            <Researches researches={researches}/>
            <AboutUsSection aboutUs={aboutUs}/>
            <ContactUs/>
        </>
    );
};


export async function getStaticProps(ctx) {

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


    return {
        props: {
            analyzes,
            slides,
            researches,
            aboutUs
        },
    }
}


export default Home;

