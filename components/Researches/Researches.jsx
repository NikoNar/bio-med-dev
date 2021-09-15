import React from 'react';
import RStyle from './research.module.scss'
import Image from "../Image/Image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import parser from 'html-react-parser'


const Researches = ({researches}) => {
    const {t} = useTranslation()
    return (
        <section className={RStyle.Research}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <div className={RStyle.Title}>
                            <h4>{t('common:researches')}</h4>
                        </div>
                    </div>
                </div>
                <div className={'row'}>
                    {
                        researches ? researches.map((item)=>{
                            return(
                                <div className={'col-lg-4'} key={item.id}>
                                    <div className={RStyle.Item}>
                                        <div className={RStyle.Image}>
                                            <Image link={item._embedded['wp:featuredmedia']['0'].source_url}/>
                                        </div>
                                        <div className={RStyle.ItemTitle}>
                                            <span>{item.title.rendered}</span>
                                        </div>
                                        <div className={RStyle.Desc}>
                                            {parser(item.content.rendered)}
                                        </div>
                                        <div className={RStyle.Link}>
                                            <Link href={
                                                item.slug === 'call-home' ? `/call-home` : item.slug === 'appointment' ? `/researches` : `page?title=${item.slug}`}>
                                                <a>{t('common:see_more')}</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : ''
                    }
                </div>
            </div>
        </section>
    );
};

export default Researches;
