import React from "react";
import {mainUrl, newsUrl} from "../../utils/url";
import NewsStyle from "./news.module.scss";
import SocialMedia from "../../components/SocialMedia/SocialMedia";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import parse from 'html-react-parser'
import Head from "next/head";


const SingleNews = ({singleNews, link, loc}) => {
    console.log(singleNews);
    const {t} = useTranslation()
    const image = singleNews[0]._embedded['wp:featuredmedia'] && singleNews[0]._embedded['wp:featuredmedia']['0'].source_url
    const title = singleNews && singleNews[0].title.rendered
    const url = mainUrl + `${loc}` + link
    const metaDesc = parse(singleNews[0].content.rendered && singleNews[0].content.rendered)[0].props.children


    return (
        <>
            <Head>
                <meta charSet="UTF-8"/>
                <meta name="viewport"
                      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                <meta property="og:image" content={image}/>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={metaDesc}/>
                <meta property="og:url" content={url}/>
                <meta property="og:type" content="website"/>
                <meta property="og:image:width" content="1200"/>
                <meta property="og:image:height" content="630"/>
                <meta property="og:image:secure_url"
                      content={singleNews[0]._embedded['wp:featuredmedia'] ? singleNews[0]._embedded['wp:featuredmedia']['0'].source_url : "/images/placeholder.png"}/>
                <meta property="og:locale:alternate" content={loc}/>
                <title>{singleNews && singleNews[0].title.rendered}</title>
            </Head>
            <section className={NewsStyle.SingleNews}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-lg-12'}>
                            <div className={NewsStyle.Wrapper}>
                                <div className={'row'}>
                                    <div className={'col-lg-12'}>
                                        <div className={NewsStyle.WrapperImg}>
                                            <img
                                                src={singleNews[0]._embedded['wp:featuredmedia'] ? singleNews[0]._embedded['wp:featuredmedia']['0'].source_url : "/images/placeholder.png"}
                                                alt=""/>
                                        </div>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-lg-8 offset-lg-2'}>
                                        <div className={NewsStyle.WrapperDate}>
                                            <span>{new Date(singleNews[0].date).toLocaleDateString()}</span>
                                        </div>
                                        <div className={NewsStyle.WrapperTitle}>
                                            <p>{singleNews[0].title.rendered}</p>
                                        </div>
                                        <div className={NewsStyle.WrapperText}>
                                            {parse(singleNews[0].content.rendered)}
                                        </div>
                                        <div className={NewsStyle.AllNewsLink}>
                                            <Link href={'/news'}><a>{t('common:back_to_all_news')}</a></Link>
                                        </div>
                                        <div className={NewsStyle.Social}>
                                            <div className={NewsStyle.SocialWrapper}>
                                                <div className={NewsStyle.SocialLabel}>
                                                    <span>{t('common:share')}: </span>
                                                </div>
                                                <SocialMedia link={link} title={singleNews[0].title.rendered}
                                                             picture={singleNews[0]._embedded['wp:featuredmedia'] ? singleNews[0]._embedded['wp:featuredmedia']['0'].source_url : "/images/placeholder.png"}
                                                             loc={loc}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={'row mb-5'}>
                                    <div className={'col-lg-12'}>

                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-lg-12'}>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export const getStaticPath = async () => {
    const res = await fetch(`${newsUrl}?status=publish&${locale !== 'hy' ? `lang=${locale}` : ''}&_embed`)
    const data = await res.json()

    const paths = data.map(news => {
        return {
            params: {
                slug: news.slug
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}


export async function getServerSideProps(ctx) {

    const loc = ctx.locale
    const link = ctx.resolvedUrl
    const singleNews = await fetch(`${newsUrl}?status=publish&slug=${ctx.params.slug}&_embed&${`${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}`}`)
        .then(res => res.json())
        .then(data => data)
    return {
        props: {singleNews, link, loc},
    }
}


export default SingleNews
