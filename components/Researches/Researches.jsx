import React from 'react';
import RStyle from './research.module.scss'
import Image from "../Image/Image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";


const Researches = ({researches}) => {
    const {t} = useTranslation()
    return (
        <section className={RStyle.Research}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <div className={RStyle.Title}>
                            <h4>{t('common:analyzes')}</h4>
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
                                            <Image link={item.image}/>
                                        </div>
                                        <div className={RStyle.ItemTitle}>
                                            <span>{item.title}</span>
                                        </div>
                                        <div className={RStyle.Desc}>
                                            <span>{item.text}</span>
                                        </div>
                                        <div className={RStyle.Link}>
                                            {/*<Link href={item.link.link}>
                                                <a>ՏԵՍՆԵԼ ԱՎԵԼԻՆ</a>
                                            </Link>*/}
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