import React from 'react';
import Slide from "./Slide/Slide";
import MainSliderStyle from './mainSlider.module.scss'
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Mousewheel} from 'swiper';

const MainSlider = (slides) => {

    return (
        <div className={'container'}>
            <div className={'row'}>
                <div className={'col-lg-12'}>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        mousewheel={true}
                        className={MainSliderStyle.SliderContainer}
                    >
                        {
                            slides.slides ? slides.slides.map((slide) => {
                                return (
                                    <SwiperSlide key={slide.id}>
                                        <Slide slide={slide}/>
                                    </SwiperSlide>
                                )
                            }) : ''
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default MainSlider;