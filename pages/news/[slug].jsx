import React, {useEffect} from "react";
import {newsUrl} from "../../utils/url";
import NewsStyle from "./news.module.scss";
import SocialMedia from "../../components/SocialMedia/SocialMedia";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import parse from 'html-react-parser'

const SingleNews = ({singleNews, link})=>{
    const {t} = useTranslation()
    return (
        <section className={NewsStyle.SingleNews}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <div className={NewsStyle.Wrapper}>
                            <div className={'row'}>
                                <div className={'col-lg-12'}>
                                    <div className={NewsStyle.WrapperImg} style={{ backgroundImage: "url(" + singleNews[0]._embedded['wp:featuredmedia']['0'].source_url + ")" }}> </div>
                                    <div className={NewsStyle.WrapperDate}>
                                        <span>{new Date(singleNews[0].date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'col-lg-8'}>
                                    <div className={NewsStyle.WrapperTitle}>
                                        <p>{singleNews[0].title.rendered}</p>
                                    </div>
                                    <div className={NewsStyle.WrapperText}>
                                        {parse(singleNews[0].content.rendered)}
                                    </div>
                                </div>
                            </div>
                            <div className={'row mb-5'}>
                                <div className={'col-lg-12'}>
                                    <div className={NewsStyle.AllNewsLink}>
                                        <Link href={'/news'}><a>{t('common:back_to_all_news')}</a></Link>
                                    </div>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'col-lg-12'}>
                                    <div className={NewsStyle.Social}>
                                        <div className={NewsStyle.SocialWrapper}>
                                            <div className={NewsStyle.SocialLabel}>
                                                <span>{t('common:share')}: </span>
                                            </div>
                                            <SocialMedia link={link}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export async function getServerSideProps(ctx) {

    const link = ctx.resolvedUrl
    const singleNews = await fetch( `${newsUrl}?status=publish&slug=${ctx.query.slug}&_embed&lang=${ctx.locale}`)
        .then(res => res.json())
        .then(data => data)
    return {
        props: {singleNews, link},
    }
}


export default SingleNews