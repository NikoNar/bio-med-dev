import React, {useEffect} from 'react'
import '../styles/globals.scss'
import '../styles/fonts.scss'
import 'bootstrap/dist/css/bootstrap.css'
import Head from "next/head";
import {createWrapper} from "next-redux-wrapper";
import {Provider, useDispatch, useSelector} from "react-redux";
import store from "../redux/store";
import {getNavBarItems} from "../redux/actions/navBarAction";
import Header from "../components/Header";


function BioMedApp({Component, pageProps}) {

    const navigationItems = useSelector(state => state.navigation)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getNavBarItems())
    }, [])


    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Bio med</title>
            </Head>
            <Provider store={store}>
                <Header navigationItems={navigationItems}/>
                <div className={'container'}>
                    <Component {...pageProps} />
                </div>
            </Provider>
        </>
    )
}


const makeStore = () => store
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(BioMedApp)
