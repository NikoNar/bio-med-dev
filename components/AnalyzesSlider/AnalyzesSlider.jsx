import React from 'react';
import AsliderStyle from './analyzes-slider.module.scss'
import Link from "next/link";
import AnalyzesCard from "../AnalyzesCard/AnalyzesCard";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';


SwiperCore.use([Mousewheel]);

const AnalyzesSlider = ({analyzes}) => {
    return (
        <div className={'container'}>
            <div className={'row'}>
                <div className={'col-lg-12'}>
                    <div className={AsliderStyle.Products}>
                        <div className={AsliderStyle.Inner}>
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={20}
                                mousewheel ={true}
                                className={AsliderStyle.SliderContainer}
                            >
                                {
                                    analyzes ? analyzes.map((analyze) => {
                                        return <SwiperSlide className={AsliderStyle.Slide} key={analyze.number}><AnalyzesCard analyze={analyze}/></SwiperSlide>
                                    }) : ''
                                }
                            </Swiper>
                        </div>
                    </div>
                    <div className={AsliderStyle.ShowMore}>
                        <Link href={'/en'}>
                            <a>ՏԵՍՆԵԼ ԱՎԵԼԻՆ</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyzesSlider;