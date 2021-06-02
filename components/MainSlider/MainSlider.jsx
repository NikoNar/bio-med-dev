import React from 'react';
import Slide from "./Slide/Slide";
import MainSliderStyle from './mainSlider.module.scss'
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';

const MainSlider = (slides) => {

    return (
        <div>
            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                mousewheel ={true}
                className={MainSliderStyle.SliderContainer}
            >
                {
                    slides.slides ? slides.slides.map((slide)=>{
                        return (
                            <SwiperSlide>
                                <Slide slide={slide}/>
                            </SwiperSlide>
                        )
                    }) : ''
                }
            </Swiper>
        </div>
    );
};

export default MainSlider;