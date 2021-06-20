import React, {useState} from 'react';
import DCStyle from '../DoctorCard/doctor-card.module.scss'
import useTranslation from "next-translate/useTranslation";

const EquipmentCard = ({inner, index, callBack, isOpen}) => {
    const {t} = useTranslation()
    return (
        <div className={DCStyle.Item}>
            <div className={DCStyle.Image} style={{backgroundImage: "url(" + inner.image + ")"}}> </div>
            <div className={DCStyle.Info}>
                <div className={isOpen === index ? DCStyle.Wrapper + ' ' + DCStyle.Open : DCStyle.Wrapper}>
                    <p className={DCStyle.Name}>{inner.title}</p>
                    <p className={DCStyle.Desc}>{inner.desc}</p>
                </div>
                <span onClick={callBack}>{t(isOpen === index ? 'common:close' : 'common:see_more')}</span>
            </div>
        </div>
    );
};

export default EquipmentCard;