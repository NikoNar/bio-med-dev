import React from 'react';
import AUStyle from './aboutUsSection.module.scss'
import Link from "next/link";

const AboutUsSection = ({aboutUs}) => {

    return (
        <section className={AUStyle.About} style={{ backgroundImage: `url(${aboutUs.image})` }}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-6'}>
                        <div className={AUStyle.Empty}></div>
                    </div>
                    <div className={'col-lg-6'}>
                        <div className={AUStyle.Info}>
                            <div className={AUStyle.Title}>
                                <h2>{aboutUs.title}</h2>
                            </div>
                            <div className={AUStyle.Text}>
                                <p>{aboutUs.text}</p>
                            </div>
                            <div className={AUStyle.Link}>
                                <Link href={aboutUs.link.link}>
                                    <a>տեսնել ավելին</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;