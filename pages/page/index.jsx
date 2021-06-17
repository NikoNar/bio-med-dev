import React from 'react';
import {useRouter} from 'next/router'
import {dynamicPageUrl} from "../../utils/url";
import PageStyle from './page.module.scss'
import Image from "../../components/Image/Image";

function Page({pageContent}) {

    const router = useRouter()

    const {title} = router.query

    return (
        <section className={PageStyle.DynamicPage}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        {
                            pageContent.map((page) => {
                                if (page.title === title) {
                                    return (
                                        <div className={'row'} key={page.content.id}>
                                            <div className={'col-lg-6'}>
                                                <div className={PageStyle.Title}>
                                                    <h4>{page.content.title}</h4>
                                                </div>
                                                <div className={PageStyle.Text}>
                                                    <p>{page.content.text}</p>
                                                </div>
                                            </div>
                                            <div className={'col-lg-6'}>
                                                <div className={PageStyle.Image} style={{backgroundImage: 'url(' + page.content.image + ')'}}>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}


export async function getServerSideProps(ctx) {
    const title = ctx.query.title

    const pageContent = await fetch(dynamicPageUrl + `?title=${title}`)
        .then(res => res.json())
        .then(data => data)

    return {
        props: {
            pageContent
        }
    }
}


export default Page;