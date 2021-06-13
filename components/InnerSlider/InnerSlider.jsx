import React, {useState} from 'react';
import ISStyle from './inner-slider.module.scss'
import Link from "next/link";
import AnalyzesCard from "../AnalyzesCard/AnalyzesCard";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Mousewheel, Navigation, Pagination} from "swiper";
import DoctorCard from "../DoctorCard/DoctorCard";
import EquipmentCard from "../EquipmentCard/EquipmentCard";
import useTranslation from "next-translate/useTranslation";


SwiperCore.use([Mousewheel, Navigation, Pagination]);


const InnerSlider = ({analyzes, doctors, component, equipment, perPage, breakpoints}) => {
    const {t} = useTranslation()
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = (index) => {
        if (isOpen === index) {
            return setIsOpen(null)
        }
        setIsOpen(index)
    }


    const breakpointsValue =
             component === 'analyzes' ? { 1700:{ slidesPerView: 3,}, 991: { slidesPerView: 2,}, 0: {slidesPerView: 1,}} :
             component === 'doctors' || component === 'equipment' ? { 1700:{ slidesPerView: 4,}, 991: { slidesPerView: 3,}, 0: {slidesPerView: 1,}} : null


    return (
        <>
            <div className={ISStyle.Products}>
                <div className={ISStyle.Inner}>
                    <Swiper
                        slidesPerView={component === 'analyzes' ? 3 : perPage}
                        spaceBetween={20}
                        mousewheel={true}
                        className={ISStyle.SliderContainer}
                        navigation={component !== 'analyzes'}
                        breakpoints={breakpointsValue}
                    >
                        {
                            analyzes && component === 'analyzes' ? analyzes.map((analyze) => {
                                return (
                                    <SwiperSlide className={ISStyle.Slide} key={analyze.number}>
                                        {
                                            <AnalyzesCard inner={analyze}/>
                                        }
                                    </SwiperSlide>
                                )
                            }) : ''
                        }
                        {
                            doctors && component === 'doctors' ? doctors.map((doctor, index) => {
                                return (
                                    <SwiperSlide className={ISStyle.Slide} key={index}>
                                        {
                                            <DoctorCard inner={doctor}/>
                                        }
                                    </SwiperSlide>
                                )
                            }) : ''
                        }
                        {
                            equipment && component === 'equipment' ? equipment.map((equipment, index) => {
                                return (
                                    <SwiperSlide className={ISStyle.Slide} key={index}>
                                        {
                                            <EquipmentCard inner={equipment} callBack={() => handleOpen(index)}
                                                           isOpen={isOpen} index={index}/>
                                        }
                                    </SwiperSlide>
                                )
                            }) : ''
                        }
                    </Swiper>
                </div>
            </div>
            <div className={ISStyle.ShowMore} style={{display: component === 'analyzes' ? 'block' : 'none'}}>
                <Link href={'/en'}>
                    <a>{t('common:read_more')}</a>
                </Link>
            </div>
        </>
    );
};

export default InnerSlider;