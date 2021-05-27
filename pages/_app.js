import React from 'react'
import '../styles/globals.scss'
import '../styles/fonts.scss'
import 'bootstrap/dist/css/bootstrap.css'
import Head from "next/head";
import {createWrapper} from "next-redux-wrapper";
import {Provider} from "react-redux";
import store from "../redux/store";


function BioMedApp({Component, pageProps}) {

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Bio med</title>
            </Head>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    )
}


const makeStore = () => store
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(BioMedApp)
