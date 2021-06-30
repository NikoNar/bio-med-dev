import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from "react";
import {analyzesCategoryUrl} from "../utils/url";

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

