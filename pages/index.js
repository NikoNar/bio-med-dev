import React from 'react';
import {analyzesUrl, newsUrl} from "../utils/url";
import TabComponent from "../components/Tab/Tab";


const Home = (analyzes) => {
    return (
        <>
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
        return {
            props: {analyzes},
        }
}



export default Home;

