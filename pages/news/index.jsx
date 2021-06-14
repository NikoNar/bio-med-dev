import React from "react";
import {newsUrl} from "../../utils/url";
import NewsStyle from './news.module.scss'
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import Pagination from "../../components/Pagination/Pgination";
import {useRouter} from "next/router";


const Index = ({news, page, totalNumberOfNews, limit}) => {

    const router = useRouter()
    const {t} = useTranslation()

    const lastPage = Math.ceil(totalNumberOfNews / 6)

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
                                                    <Link href={'/news/' + n.id}>
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


export async function getServerSideProps({query:{page=1}}) {
    debugger
    const start = +page === 1 ? 0 : (+page - 1) * 6
    const limit = 6
    const allNews = await fetch(newsUrl)
        .then(res => res.json())
        .then(data => data)

    const news = await fetch(newsUrl +`?_start=${start}&_limit=${limit}`)
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


export default Index