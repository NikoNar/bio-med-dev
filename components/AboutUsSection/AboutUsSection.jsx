import React from 'react';
import AUStyle from './aboutUsSection.module.scss'
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

const AboutUsSection = ({aboutUs}) => {

    const {t} = useTranslation()
    return (
        <section className={AUStyle.About} style={{ backgroundImage: `url(${aboutUs[0]._embedded['wp:featuredmedia']['0'].source_url})` }}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-6'}>
                        <div className={AUStyle.Empty}></div>
                    </div>
                    <div className={'col-lg-6'}>
                        <div className={AUStyle.Info}>
                            <div className={AUStyle.Title}>
                                <h2>{aboutUs[0].metadata.title[0]}</h2>
                            </div>
                            <div className={AUStyle.Text}>
                                <p>{aboutUs[0].metadata.text[0]}</p>
                            </div>
                            <div className={AUStyle.Link}>
                                <Link href={`/${aboutUs[0].slug}`}>
                                    <a>{t('common:see_more')}</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;
