import React from 'react';
import SlideStyle from './slide.module.scss'
import LinkButton from "../../LinkButton/LinkButton";
import Image from "../../Image/Image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import parse from 'html-react-parser';

const Slide = ({slide, flag}) => {
    const {t} = useTranslation()
    return (
        <div className={'row'}>
            <div className={'col-lg-6 col-md-6'}>
                <div className={SlideStyle.Text}>
                    <div className={SlideStyle.Line} style={{display: !flag ? 'block' : 'none'}}>
                        <h5>{t('common:welcome')}</h5>
                    </div>
                    <div className={SlideStyle.Line}>
                        <h1>{parse(slide.title.rendered)}</h1>
                    </div>
                    <div className={SlideStyle.Line}>
                        {parse(slide.content.rendered)}
                    </div>
                    {!flag ? <div className={SlideStyle.Link}>
                                <LinkButton text={t('common:read_more')} link={'/'}/>
                            </div>
                        :
                        <Link href={slide.link}>
                            <a style={{textAlign: 'right', color: '#52a4e3'}}>{t('common:see_more')}</a>
                        </Link>}
                </div>
            </div>
            <div className={'col-lg-6 col-md-6 order-first order-lg-last'}>
                <div className={SlideStyle.Wrapper}>
                    <div className={SlideStyle.Image}>
                        <Image link={slide._embedded['wp:featuredmedia']['0'].source_url}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide;
