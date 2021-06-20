import React from 'react';
import DCStyle from './doctor-card.module.scss'

const DoctorCard = ({inner}) => {

    return (
        <div className={DCStyle.Item}>
            <div className={DCStyle.Image} style={{backgroundImage: "url(" + inner.image + ")"}}> </div>
            <div className={DCStyle.Info}>
                <p className={DCStyle.Name}>{inner.name}</p>
                <p className={DCStyle.Desc}>{inner.desc}</p>
            </div>
        </div>
    );
};


export default DoctorCard;