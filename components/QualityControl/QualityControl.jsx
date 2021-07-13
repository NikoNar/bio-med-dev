import React from 'react';
import QCStyle from './quality-control.module.scss'
import Image from "../Image/Image";
import parse from "html-react-parser"


const QualityControl = ({qualityControl}) => {
    return (
        <section className={QCStyle.Quality}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-7'}>
                        <div className={QCStyle.Text}>
                            <div className={QCStyle.Inner}>
                                <h4>{qualityControl[0].title.rendered}</h4>
                                {parse(qualityControl[0].content.rendered)}
                            </div>
                        </div>
                    </div>
                    <div className={'col-lg-5'}>
                        <div className={QCStyle.Image}>
                            <Image link={qualityControl[0]._embedded['wp:featuredmedia']['0'].source_url}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};



export default QualityControl;
