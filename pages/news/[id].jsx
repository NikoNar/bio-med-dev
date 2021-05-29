import React from "react";
import {useRouter} from "next/router";
import {newsUrl} from "../../utils/url";
import NewsStyle from "./news.module.scss";
import SocialMedia from "../../components/SocialMedia/SocialMedia";

const SingleNews = (singleNews)=>{
    const router = useRouter()

    return (
        <section className={NewsStyle.SingleNews}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <div className={NewsStyle.Wrapper}>
                            <div className={'row'}>
                                <div className={'col-lg-12'}>
                                    <div className={NewsStyle.WrapperImg} style={{ backgroundImage: "url(" + singleNews.singleNews.image + ")" }}> </div>
                                    <div className={NewsStyle.WrapperDate}>
                                        <span>{singleNews.singleNews.date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'col-lg-8'}>
                                    <div className={NewsStyle.WrapperTitle}>
                                        <p>{singleNews.singleNews.title}</p>
                                    </div>
                                    <div className={NewsStyle.WrapperText}>
                                        <p>{singleNews.singleNews.body}</p>
                                        <p>{singleNews.singleNews.body}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'col-lg-12'}>
                                    <div className={NewsStyle.Social}>
                                        <div className={NewsStyle.SocialWrapper}>
                                            <div className={NewsStyle.SocialLabel}>
                                                <span>Share: </span>
                                            </div>
                                            <SocialMedia/>
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
    const singleNews = await fetch(newsUrl + context.query.id)
        .then(res => res.json())
        .then(data => data)
    return {
        props: {singleNews},
    }
}


export default SingleNews