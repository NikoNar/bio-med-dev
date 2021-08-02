import React, {useState} from 'react';
import ISStyle from './inner-slider.module.scss'
import AnalyzesCard from "../AnalyzesCard/AnalyzesCard";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Mousewheel, Navigation, Pagination} from "swiper";
import DoctorCard from "../DoctorCard/DoctorCard";
import EquipmentCard from "../EquipmentCard/EquipmentCard";


SwiperCore.use([Mousewheel, Navigation, Pagination]);


const InnerSlider = ({analyzes, doctors, component, equipment, perPage, mainCategory}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = (index) => {
        if (isOpen === index) {
            return setIsOpen(null)
        }
        setIsOpen(index)
    }


    const breakpointsValue =
             component === 'analyzes' ? { 1700:{ slidesPerView: analyzes.length > 2 ? 3 : 2}, 991: { slidesPerView: 2,}, 0: {slidesPerView: 1}} :
             component === 'doctors' || component === 'equipment' ? { 1700:{ slidesPerView: 4}, 991: { slidesPerView: 3}, 476: { slidesPerView: 2}, 0: {slidesPerView: 1}} : null


    return (
        <>
            <div className={ISStyle.Products}>
                <div className={ISStyle.Inner + ' ' + 'inner_slider'}>
                    <Swiper
                        slidesPerView={component === 'analyzes' && analyzes && analyzes.length > 2 ? 3 : analyzes && analyzes.length <= 2 ? 2 : perPage}
                        spaceBetween={20}
                        //mousewheel={component === 'analyzes'}
                        className={ISStyle.SliderContainer}
                        //navigation={component !== 'analyzes'}
                        navigation={true}
                        breakpoints={breakpointsValue}
                        autoHeight={false}
                    >
                        {
                            analyzes && component === 'analyzes' ? analyzes.map((analyze) => {
                                if (mainCategory === analyze.mainCategory){
                                    return (
                                        <SwiperSlide className={ISStyle.Slide} key={Math.random()}>
                                            {
                                                <AnalyzesCard inner={analyze} id={analyze.id}/>
                                            }
                                        </SwiperSlide>
                                    )
                                }
                            }) : ''
                        }
                        {
                            doctors && component === 'doctors' ? doctors.map((doctor, index) => {
                                return (
                                    <SwiperSlide className={ISStyle.Slide} key={doctor.id}>
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
                                    <SwiperSlide className={ISStyle.Slide} key={equipment.id}>
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
        </>
    );
};

export default InnerSlider;
