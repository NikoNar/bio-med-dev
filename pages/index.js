import React from 'react';
import {analyzesUrl, slidesUrl} from "../utils/url";
import TabComponent from "../components/Tab/Tab";
import MainSlider from "../components/MainSlider/MainSlider";


const Home = ({analyzes, slides}) => {

    return (
        <>
            <MainSlider slides={slides}/>
            <TabComponent analyzes={analyzes}/>
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


    return {
        props: {
            analyzes,
            slides
        },
    }
}


export default Home;

