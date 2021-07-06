import React from 'react';
import DCStyle from './doctor-card.module.scss'
import render from 'html-react-parser'

const DoctorCard = ({inner}) => {
    return (
        <div className={DCStyle.Item}>
            <div className={DCStyle.Image} style={{backgroundImage: `url(${inner._embedded ? inner._embedded['wp:featuredmedia']['0'].source_url : ""})`}}> </div>
            <div className={DCStyle.Info}>
                <div className={DCStyle.Name}>{render(inner.title.rendered)}</div>
                <div className={DCStyle.Desc}>{render(inner.content.rendered)}</div>
            </div>
        </div>
    );
};


export default DoctorCard;
