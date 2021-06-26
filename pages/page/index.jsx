import React from 'react';
import {dynamicPageUrl} from "../../utils/url";
import PageStyle from './page.module.scss'


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
                                    <h4>{content.title.rendered}</h4>
                                </div>
                                <div className={PageStyle.Text}>
                                    <p>{content.content.rendered}</p>
                                </div>
                            </div>
                            <div className={'col-lg-6'}>
                                {/*<div className={PageStyle.Image} style={{backgroundImage: 'url(' + content.content.image + ')'}}>*/}

                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


export async function getServerSideProps(ctx) {
    debugger
    const title = ctx.query.title ? ctx.query.title : null
    const pageContent = await fetch(dynamicPageUrl + `&slug=${title}` + `&lang=${ctx.locale}`)
        .then(res => res.json())
        .then(data => data)

    console.log(pageContent)

    return {
        props: {
            pageContent,
            title
        }
    }
}


export default Page;