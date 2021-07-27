import React from 'react';
import Slide from "./Slide/Slide";
import MainSliderStyle from './mainSlider.module.scss'
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Mousewheel, Navigation, Pagination, Autoplay } from "swiper";


 SwiperCore.use([Mousewheel, Navigation, Pagination, Autoplay ]);

const MainSlider = (slides) => {

    return (
        <section className={MainSliderStyle.Slider}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={20}
                            //mousewheel={true}
                            className={MainSliderStyle.SliderContainer + ' ' + 'main_slider'}
                            pagination={{clickable: true}}
                            navigation={true}
                            autoplay={{delay: 5000}}
                        >
                            {
                                slides.slides ? slides.slides.map((slide) => {
                                    console.log(slide)
                                    return (
                                        <SwiperSlide key={slide.id}>
                                            <Slide slide={slide} button_link={slide.button_url} button_text={slide.button_name} subtitle={slide.subtitle}/>
                                        </SwiperSlide>
                                    )
                                }) : ''
                            }
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainSlider;
