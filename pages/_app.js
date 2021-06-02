import React, {useEffect, useState} from 'react'
import '../styles/styles.scss'
import 'bootstrap/dist/css/bootstrap.css'
import Head from "next/head";
import {createWrapper} from "next-redux-wrapper";
import {Provider} from "react-redux";
import store from "../redux/store";
import Header from "../components/Header/Header";
import 'swiper/swiper.scss';
import 'react-tabs/style/react-tabs.scss';
import Footer from "../components/Footer/Footer";
import 'react-datepicker/dist/react-datepicker.css'
import {appWithTranslation} from 'next-i18next'
import {analyzesUrl} from "../utils/url";




function BioMedApp({Component, pageProps}, analyzes) {

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Bio med</title>
                <script src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCmivibDflTIZyyFvkr4gGsFEJa_Yd4o88&v=3.exp&libraries=geometry,drawing,places`}/>

            </Head>
            <Provider store={store}>
                    <Header pageProps={pageProps}/>
                        <Component {...pageProps}/>
                    <Footer/>
            </Provider>
        </>
    )
}


export async function getServerSideProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    if (Object.keys(pageProps).length > 0) {
        // return pageProps only when its present
        return { pageProps };
    }
    return {};
}



const makeStore = () => store

const wrapper = createWrapper(makeStore)

export default appWithTranslation(BioMedApp)
