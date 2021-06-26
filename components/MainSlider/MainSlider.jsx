import React from 'react';
import Slide from "./Slide/Slide";
import MainSliderStyle from './mainSlider.module.scss'
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Mousewheel, Navigation, Pagination} from "swiper";


 SwiperCore.use([Mousewheel, Navigation, Pagination]);

const MainSlider = (slides) => {

    //console.log(slides)
    return (
        <section className={MainSliderStyle.Slider}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={20}
                            mousewheel={true}
                            className={MainSliderStyle.SliderContainer}
                            pagination={{clickable: true}}
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
        </section>
    );
};

export default MainSlider;