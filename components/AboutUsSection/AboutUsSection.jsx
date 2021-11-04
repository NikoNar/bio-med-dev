import React, { useState, useEffect } from 'react';
import AUStyle from './aboutUsSection.module.scss'
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

const AboutUsSection = ({aboutUs}) => {

    let imgId= (aboutUs[0].metadata.image) ? aboutUs[0].metadata.image[0] : aboutUs[0].featured_media;

    const [img, setImg] = useState('');

    const getImg = () =>{
        fetch('https://admin.biomed.am/wp-json/wp/v2/media/'+ imgId)
        .then(res => res.json())
        .then(data => {
            setImg(data.guid.rendered)
        })
    }

    useEffect(() => {
        getImg();
    },[]);

    const {t} = useTranslation()
    return (
        <section className={AUStyle.About} style={{ backgroundImage: `url(${img})` }}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-6'}>
                        <div className={AUStyle.Empty}>
                            <img src={aboutUs[0]._embedded['wp:featuredmedia']['0'].source_url} alt=""/>
                        </div>
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
