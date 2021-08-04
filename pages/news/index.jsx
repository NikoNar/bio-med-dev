import React from "react";
import {newsUrl} from "../../utils/url";
import NewsStyle from './news.module.scss'
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import Pagination from "../../components/Pagination/Pgination";
import {useRouter} from "next/router";
import parse from 'html-react-parser'

const News = ({news, page, totalNumberOfNews, limit}) => {
    const router = useRouter()
    const {t} = useTranslation()
    const lastPage = Math.ceil(totalNumberOfNews / 9)


    const prev = ()=>router.push(`/news?page=${page-1}`)
    const next = ()=>router.push(`/news?page=${page+1}`)

    return (
        <>
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
                        {news && news.map((n) => {
                            const newsImage = n._embedded['wp:featuredmedia'] && n._embedded['wp:featuredmedia']['0'].source_url
                            return (
                                    <div className={'col-lg-4 mb-5'} key={n.id}>
                                        <div className={NewsStyle.Item}>
                                            <div className={NewsStyle.Img}
                                                 style={{backgroundImage: "url(" + `${newsImage ? newsImage : "/images/placeholder.png"}` + ")"}}>
                                            </div>
                                            <div className={NewsStyle.Body}>
                                                <div className={NewsStyle.Date}>
                                                    <span>{new Date(n.date).toLocaleDateString()}</span>
                                                </div>
                                                <div className={NewsStyle.ItemTitle}>
                                                    {parse(n.title.rendered)}
                                                </div>
                                                <div className={NewsStyle.ItemText}>
                                                    {parse(n.content.rendered)}
                                                </div>
                                                <div className={NewsStyle.Link}>
                                                    <Link href={'/news/' + n.slug}>
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
            <Pagination
                totalPageCount={lastPage}
                callBackPrev={prev}
                callBackNext={next}
                page={page}
                link={'/news?page='}
                router={router}
                limit={limit}
            />
        </>
    )
}


export async function getServerSideProps({locale: locale ,query:{page=1}}) {
    const start = page === 1 ? 0 : (page - 1) * 9
    const limit = 9
    const allNews = await fetch(`${newsUrl}?status=publish&${locale !== 'hy' ? `lang=${locale}` : ''}&_embed`)
        .then(res => res.json())
        .then(data => data)

    const news = await fetch(`${newsUrl}?status=publish&page=${page}&${locale !== 'hy' ? `lang=${locale}` : ''}&_embed&per_page=${limit}&offset=${start}`)
        .then(res => res.json())
        .then(data => data)

    const totalNumberOfNews = allNews.length

    return {
        props: {
            news,
            page: +page,
            totalNumberOfNews,
            limit
        },
    }
}


export default News
