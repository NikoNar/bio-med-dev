import React from "react";
import {useRouter} from "next/router";
import {newsUrl} from "../../utils/url";
import NewsStyle from "./news.module.scss";
import SocialMedia from "../../components/SocialMedia/SocialMedia";
import useTranslation from "next-translate/useTranslation";

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
                                    <div className={NewsStyle.WrapperImg} style={{ backgroundImage: "url(" + singleNews.image + ")" }}> </div>
                                    <div className={NewsStyle.WrapperDate}>
                                        <span>{singleNews.date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'col-lg-8'}>
                                    <div className={NewsStyle.WrapperTitle}>
                                        <p>{singleNews.title}</p>
                                    </div>
                                    <div className={NewsStyle.WrapperText}>
                                        <p>{singleNews.body}</p>
                                        <p>{singleNews.body}</p>
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


export async function getServerSideProps(context) {
    const link = context.resolvedUrl
    const singleNews = await fetch(newsUrl + context.query.id)
        .then(res => res.json())
        .then(data => data)
    return {
        props: {singleNews, link},
    }
}


export default SingleNews