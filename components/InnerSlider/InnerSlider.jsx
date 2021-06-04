import React, {useState} from 'react';
import ISStyle from './inner-slider.module.scss'
import Link from "next/link";
import AnalyzesCard from "../AnalyzesCard/AnalyzesCard";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Mousewheel, Navigation, Pagination} from "swiper";
import DoctorCard from "../DoctorCard/DoctorCard";
import EquipmentCard from "../EquipmentCard/EquipmentCard";



SwiperCore.use([Mousewheel, Navigation, Pagination]);


const InnerSlider = ({analyzes, doctors, component, equipment, perPage}) => {

    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = (index)=>{
        if (isOpen === index){
            return setIsOpen(null)
        }
        setIsOpen(index)
    }


    return (
        <>
            <div className={ISStyle.Products}>
                <div className={ISStyle.Inner}>
                    <Swiper
                        slidesPerView={component === 'analyzes' ? 3 : perPage}
                        spaceBetween={20}
                        mousewheel={true}
                        className={ISStyle.SliderContainer}
                        navigation = {component !== 'analyzes'}
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
                            doctors && component === 'doctors' ? doctors.map((doctor) => {
                                return (
                                    <SwiperSlide className={ISStyle.Slide} key={doctors.id}>
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
                                            <EquipmentCard inner={equipment} callBack={()=>handleOpen(index)} isOpen={isOpen} index={index}/>
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
                    <a>ՏԵՍՆԵԼ ԱՎԵԼԻՆ</a>
                </Link>
            </div>
        </>
    );
};

export default InnerSlider;