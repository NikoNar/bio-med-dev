import React, {useEffect} from 'react'
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

function BioMedApp({Component, pageProps}) {

    return (
        <>
            <Head>

                <meta charSet="UTF-8"/>
                <meta name="viewport"
                      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
                <meta name="description" content={`${pageProps.aboutUs && pageProps.aboutUs.text}`}/>
                <meta property="og:image" content={`${pageProps.singleNews && pageProps.singleNews.image}`}/>
                <meta property="og:title" content={`${pageProps.singleNews && pageProps.singleNews.title}`}/>
                <meta property="og:description" content={`${pageProps.singleNews && pageProps.singleNews.body}`}/>

                <title>Bio med</title>
                <script
                    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API}&v=3.exp&libraries=geometry,drawing,places`}/>

            </Head>

                <Provider store={store}>
                    <Header pageProps={pageProps}/>
                    <Component {...pageProps}/>
                    <Footer/>
                </Provider>
        </>
    )
}


/*
export async function getServerSideProps({Component, ctx}) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    if (Object.keys(pageProps).length > 0) {
        return {pageProps};
    }
}
*/


const makeStore = () => store

const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(BioMedApp)
