import React, {useState} from 'react';
import DCStyle from '../DoctorCard/doctor-card.module.scss'

const EquipmentCard = ({inner, index, callBack, isOpen}) => {
    console.log(isOpen);

    return (
        <div className={DCStyle.Item}>
            <div className={DCStyle.Image} style={{backgroundImage: "url(" + inner.image + ")"}}> </div>
            <div className={DCStyle.Info}>
                <div className={isOpen === index ? DCStyle.Wrapper + ' ' + DCStyle.Open : DCStyle.Wrapper}>
                    <p className={DCStyle.Name}>{inner.title}</p>
                    <p className={DCStyle.Desc}>{inner.desc}</p>
                </div>
                <span onClick={callBack}>{ isOpen === index ? 'փակել' : 'ՏԵՍՆԵԼ ԱՎԵԼԻՆ' }</span>
            </div>
        </div>
    );
};

export default EquipmentCard;