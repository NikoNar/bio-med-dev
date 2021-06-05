import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from "react";
import {connect} from "react-redux";
import {createWrapper} from "next-redux-wrapper";
import store from "../redux/store";

export default class MyDocument extends Document {

    render() {
        return (
            <Html>
                <Head>

                </Head>
                <body>
                <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
