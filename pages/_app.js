import React from 'react'
import '../styles/styles.scss'
import 'bootstrap/dist/css/bootstrap.css'
import Head from "next/head";
import {createWrapper} from "next-redux-wrapper";
import {Provider} from "react-redux";
import store from "../redux/store";
import Header from "../components/Header/Header";
import 'swiper/swiper.scss';

function BioMedApp({Component, pageProps}) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Bio med</title>
            </Head>
            <Provider store={store}>
                    <Header/>
                    <div className={'container'}>
                        <Component {...pageProps} />
                    </div>
            </Provider>
        </>
    )
}


const makeStore = () => store

const wrapper = createWrapper(makeStore)

export default BioMedApp
