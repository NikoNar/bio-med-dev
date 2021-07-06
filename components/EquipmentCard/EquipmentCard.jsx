import React from 'react';
import DCStyle from '../DoctorCard/doctor-card.module.scss'
import useTranslation from "next-translate/useTranslation";
import render from 'html-react-parser'

const EquipmentCard = ({inner, index, callBack, isOpen}) => {
    const {t} = useTranslation()
    return (
        <div className={DCStyle.Item}>
            <div className={DCStyle.Image} style={{backgroundImage: `url(${inner._embedded ? inner._embedded['wp:featuredmedia']['0'].source_url : ""})`}}> </div>
            <div className={DCStyle.Info}>
                <div className={isOpen === index ? DCStyle.Wrapper + ' ' + DCStyle.Open : DCStyle.Wrapper}>
                    <div className={DCStyle.Name}>{render(inner.title.rendered)}</div>
                    <div className={DCStyle.Desc}>{render(inner.content.rendered)}</div>
                </div>
                <span onClick={callBack}>{t(isOpen === index ? 'common:close' : 'common:see_more')}</span>
            </div>
        </div>
    );
};

export default EquipmentCard;
