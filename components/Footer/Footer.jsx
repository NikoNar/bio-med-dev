import React, {useEffect} from 'react'
import FooterStyle from './footer.module.scss'
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {getNavBarItems} from "../../redux/actions/navBarAction";
import {getAllNews} from "../../redux/actions/getAllNewsAction";
import MiniFooter from "../MiniFooter/MiniFooter";
import useTranslation from "next-translate/useTranslation";


const Footer = ({loc})=>{
    const {t} = useTranslation()
    const navigation = useSelector(state=>state.navigation)
    const news = useSelector(state => state.news)
    const dispatch = useDispatch()
    const size = 3
    const footerNews = news.slice(0, size).map(i => {
        return i
    })



    useEffect(()=>{
        dispatch(getAllNews(loc))
    },[loc])

    return(
        <footer className={FooterStyle.Footer}>
            <div className={FooterStyle.FooterMain}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-lg-3 mb-5 col-12'}>
                            <div className={FooterStyle.Wrapper}>
                                <div className={FooterStyle.Logo}>
                                    <Link href={'/'}>
                                        <a>
                                            <svg fill="none" viewBox="0 0 217 65" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M32.896 38.458C32.896 44.2338 28.1945 48.9303 22.4125 48.9303H0V16.0693H20.7286C25.6164 16.0693 29.6101 20.0588 29.6101 24.9414C29.6101 26.7278 29.096 28.3652 28.2019 29.7273C31.0184 31.6104 32.896 34.796 32.896 38.458ZM5.87136 27.9484H20.7733C22.42 27.9484 23.7835 26.5863 23.7835 24.9414C23.7835 23.2965 22.42 21.9344 20.7733 21.9344H5.87136V27.9484ZM22.42 43.0131C24.9607 43.0131 27.0247 40.9439 27.0247 38.4133C27.0247 35.8752 24.9533 33.8135 22.42 33.8135H5.87136V43.0652H22.4125V43.0131H22.42Z"
                                                    fill="#183042"/>
                                                <path d="M42.2991 16.0693H36.4277V48.9303H42.2991V16.0693Z"
                                                      fill="#183042"/>
                                                <path
                                                    d="M146.143 16.0693V48.9303H140.272V27.9931L134.49 32.4068L129.699 36.1134L124.901 32.4068L119.119 27.9931V48.9303H113.247V16.0693L119.119 20.5724L129.699 28.6927L140.272 20.5724L146.143 16.0693Z"
                                                    fill="#183042"/>
                                                <path
                                                    d="M200.222 16.114C209.29 16.114 216.674 23.4379 216.674 32.4961C216.674 36.5302 215.214 40.2443 212.77 43.1024C212.487 43.4299 212.159 43.7574 211.831 44.0924C208.873 47.0993 204.782 48.9303 200.267 48.9303H183.815V16.0693H200.267L200.222 16.114ZM210.795 32.5482C210.795 26.7278 206.049 21.9865 200.222 21.9865H189.649V43.1099H200.222C206.049 43.1099 210.795 38.3687 210.795 32.5482Z"
                                                    fill="#183042"/>
                                                <path
                                                    d="M78.3245 65L50.1523 48.7519V16.2481L78.3245 0L106.497 16.2481V48.7519L78.3245 65ZM55.1221 45.8788L78.3245 59.2614L101.527 45.8788V19.1137L78.3245 5.73858L55.1221 19.1137V45.8788Z"
                                                    fill="#932322"/>
                                                <path
                                                    d="M92.0109 38.9526L77.0798 47.5645L79.5647 51.8637L94.4957 43.2519L92.0109 38.9526Z"
                                                    fill="#932322"/>
                                                <path d="M65.8814 23.8921H60.9116V41.1153H65.8814V23.8921Z"
                                                      fill="#932322"/>
                                                <path
                                                    d="M79.5637 13.1329L77.0787 17.4321L92.01 26.0436L94.4949 21.7444L79.5637 13.1329Z"
                                                    fill="#932322"/>
                                                <path
                                                    d="M157.268 21.9124V28.0603H179.069V33.8584H157.268V43.1548H179.069V48.9529H151.471V16.1143H179.069V21.9124H157.268Z"
                                                    fill="#183042"/>
                                            </svg>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={'col-lg-3 mb-3 mb-lg-0 col-md-4 col-sm-12'}>
                            <div className={FooterStyle.List}>
                                <ul>
                                    {
                                        navigation.items ? navigation.items.map((item)=>{
                                            return(
                                                <li key={item.ID}>
                                                    <Link href={`/${item.slug}`}>
                                                        <a>{item.title}</a>
                                                    </Link>
                                                </li>
                                            )
                                        }): ''
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className={'col-lg-3 mb-3 mb-lg-0 col-md-4 col-sm-12 order-last order-lg-3' + ' ' + FooterStyle.News}>
                            <div className={FooterStyle.NewsTitle}>
                                <h5>{t('common:news')}</h5>
                            </div>
                            <div className={'row'}>
                                {
                                    footerNews ? footerNews.map((n)=>{
                                        return (
                                            <div className={'col-lg-12 mt-2 mt-lg-3'} key={n.id}>
                                                <div className={FooterStyle.NewsItem}>
                                                    <Link href={`/news/${n.slug}`}>
                                                        <a>{n.title.rendered}</a>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    }): ''
                                }
                            </div>
                        </div>
                        <div className={'col-lg-3 mb-3 mb-lg-0 col-md-4 col-sm-12'}>
                        </div>
                    </div>
                </div>
            </div>
            <MiniFooter/>
        </footer>
    )
}

export default Footer