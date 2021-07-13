import React from 'react';
import DCStyle from './doctor-card.module.scss'
import render from 'html-react-parser'

const DoctorCard = ({inner}) => {
    return (
        <div className={DCStyle.Item}>
            <div className={DCStyle.Image}
                 style={{backgroundImage: `url(${inner._embedded ? inner._embedded['wp:featuredmedia']['0'].source_url : ""})`}}></div>
            <div className={DCStyle.Info}>
                <div className={DCStyle.Name}>{render(inner.title.rendered)}</div>
                <div className={DCStyle.Desc}>{render(inner.content.rendered)}
                    <div style={{maxHeight: '0', overflow: 'hidden'}}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, nulla, totam! Accusamus
                            accusantium aliquid asperiores autem cumque eos et ex illo impedit molestias non obcaecati,
                            porro ratione reprehenderit temporibus vero.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default DoctorCard;
