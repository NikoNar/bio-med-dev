import React from "react";
import {newsUrl} from "../../utils/url";
import NewsStyle from './news.module.scss'
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";


const Index = ({news}) => {

    const {t} = useTranslation()

    return (
        <section className={NewsStyle.News}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <div className={NewsStyle.Title}>
                            <h4>{t('common:news')}</h4>
                        </div>
                    </div>
                </div>
                <div className={'row'}>
                    {news.map((n) => {
                            return (
                                <div className={'col-lg-4 mb-5'} key={n.id}>
                                    <div className={NewsStyle.Item}>
                                        <div className={NewsStyle.Img}
                                             style={{backgroundImage: "url(" + n.image + ")"}}></div>
                                        <div className={NewsStyle.Body}>
                                            <div className={NewsStyle.Date}>
                                                <span>{n.date}</span>
                                            </div>
                                            <div className={NewsStyle.ItemTitle}>
                                                <p>{n.title}</p>
                                            </div>
                                            <div className={NewsStyle.ItemText}>
                                                <p>{n.body}</p>
                                            </div>
                                            <div className={NewsStyle.Link}>
                                                <Link href={`/news/${n.id}`}>
                                                    <a>{t('common:read_more')}</a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    )
                    }
                </div>
            </div>
        </section>
    )
}


export async function getStaticProps() {
    const news = await fetch(newsUrl)
        .then(res => res.json())
        .then(data => data)
    return {
        props: {news},
    }
}


export default Index