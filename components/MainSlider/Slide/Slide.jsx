import React from 'react';
import SlideStyle from './slide.module.scss'
import Link from "next/link";
import LinkButton from "../../LinkButton/LinkButton";
import Image from "../../Image/Image";

const buttonLink = "/profile"


const Slide = ({slide}) => {
    console.log(slide);
    return (
        <div className={'row'}>
            <div className={'col-lg-6 col-md-6'}>
                <div className={SlideStyle.Text}>
                    <div className={SlideStyle.Line}>
                        <h5>ԲԱՐԻ ԳԱԼՈՒՍՏ</h5>
                    </div>
                    <div className={SlideStyle.Line}>
                        <h1>{slide.title}</h1>
                    </div>
                    <div className={SlideStyle.Line}>
                        <p>{slide.desc}</p>
                    </div>
                    <div className={SlideStyle.Link}>
                        <LinkButton text={'ՏԵՍՆԵԼ ԱՎԵԼԻՆ'}/>
                    </div>
                </div>
            </div>
            <div className={'col-lg-6 col-md-6 order-first order-lg-last'}>
                <div className={SlideStyle.Wrapper}>
                    <div className={SlideStyle.Image}>
                        <Image link={slide.image}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide;