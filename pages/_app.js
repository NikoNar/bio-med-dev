import React, {useEffect, useState} from 'react'
import '../styles/styles.scss'
import '../styles/globals.scss'
import '../styles/fonts.scss'
import 'bootstrap/dist/css/bootstrap.css'
import Head from "next/head";
import {createWrapper} from "next-redux-wrapper";
import {Provider} from "react-redux";
import store from "../redux/store";
import Header from "../components/Header/Header";
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'react-tabs/style/react-tabs.scss';
import Footer from "../components/Footer/Footer";
import 'react-datepicker/dist/react-datepicker.css'
import I18nProvider from 'next-translate/I18nProvider'
import useTranslation from "next-translate/useTranslation";
import NProgress from 'nprogress';
import Router from "next/router";
import parse from "html-react-parser";




Router.events.on('routeChangeStart', (url) => {
    NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())



function BioMedApp({Component, pageProps}) {
    const { t, lang } = useTranslation()
    return (
        <>
            <Head>
                <meta charSet="UTF-8"/>
                <meta name="viewport"
                      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
                <title>BIOMED</title>
                <script
                    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API}&v=3.exp&libraries=geometry,drawing,places`}/>

            </Head>
            <I18nProvider lang={lang}>
                <Provider store={store}>
                    <Header pageProps={pageProps} loc={lang}/>
                    <Component {...pageProps} t={t} loc={lang}/>
                    <Footer loc={lang} />
                </Provider>
            </I18nProvider>
        </>
    )
}




export async function getServerSideProps(ctx){

    return {
        props:{}
    }
}




const makeStore = () => store

const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(BioMedApp)
