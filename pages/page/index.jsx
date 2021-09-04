import React from 'react';
import {dynamicPageUrl} from "../../utils/url";
import PageStyle from './page.module.scss'
import parse from "html-react-parser";


function Page({pageContent}) {

    const content = pageContent[0]

    return (
        <section className={PageStyle.DynamicPage}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <div className={'row'} key={content.id}>
                            <div className={'col-lg-6'}>
                                <div className={PageStyle.Title}>
                                    <h4>{parse(content.title.rendered)}</h4>
                                </div>
                                <div className={PageStyle.Text}>
                                    {parse(content.content.rendered)}
                                </div>
                            </div>
                            <div className={'col-lg-6'}>
                                <div
                                    className={PageStyle.Image}
                                    style={{backgroundImage: content._embedded['wp:featuredmedia'] ? 'url(' +  content._embedded['wp:featuredmedia']['0'].source_url + ')' : "url('/images/placeholder.png')"}}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


export async function getServerSideProps(ctx) {
    const title = ctx.query.title ? ctx.query.title : null
    const pageContent = await fetch(`${dynamicPageUrl}&slug=${title}&lang=${ctx.locale}&_embed`)
        .then(res => res.json())
        .then(data => data)

    return {
        props: {
            pageContent,
            title
        }
    }
}


export default Page;
