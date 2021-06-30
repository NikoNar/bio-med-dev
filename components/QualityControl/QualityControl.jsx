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
                                <h4>{qualityControl.title}</h4>
                                {parse(qualityControl.body)}
                            </div>
                        </div>
                    </div>
                    <div className={'col-lg-5'}>
                        <div className={QCStyle.Image}>
                            <Image link={qualityControl.image}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};



export default QualityControl;