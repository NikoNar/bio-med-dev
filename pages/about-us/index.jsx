import React from 'react';
import AUStyle from './about-us.module.scss'
import Slide from "../../components/MainSlider/Slide/Slide";
import {aboutUsUrl, doctorsUsUrl, equipmentUrl, qualityControlUrl} from "../../utils/url";
import InnerSlider from "../../components/InnerSlider/InnerSlider";
import QualityControl from "../../components/QualityControl/QualityControl";

import useTranslation from "next-translate/useTranslation";

const AboutUs = ({aboutUsContent, doctors, equipment, qualityControl}) => {

    const {t} = useTranslation()

    return (
        <>
            <section className={AUStyle.AboutUs}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-lg-12'}>
                            <Slide flag={true} slide={aboutUsContent[0]}/>
                        </div>
                    </div>
                </div>
            </section>
            {/*<section className={AUStyle.WithSlider}>*/}
            {/*    <div className={'container'}>*/}
            {/*        <div className={'row'}>*/}
            {/*            <div className={'col-lg-12'}>*/}
            {/*                <div className={AUStyle.Title}>*/}
            {/*                    <h4>{aboutUsContent.doctors.title}</h4>*/}
            {/*                </div>*/}
            {/*                <div className={'row'}>*/}
            {/*                    <div className={'col-lg-6'}>*/}
            {/*                        <div className={AUStyle.Desc}>*/}
            {/*                            <p>{aboutUsContent.doctors.body}</p>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className={'row'}>*/}
            {/*                    <div className={'col-lg-12'}>*/}
            {/*                        <InnerSlider component={'doctors'} doctors={doctors} perPage={4}/>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
            {/*<section className={AUStyle.WithSlider}>*/}
            {/*    <div className={'container'}>*/}
            {/*        <div className={'row'}>*/}
            {/*            <div className={'col-lg-12'}>*/}
            {/*                <div className={AUStyle.Title}>*/}
            {/*                    <h4>{aboutUsContent.equipment.title}</h4>*/}
            {/*                </div>*/}
            {/*                <div className={'row'}>*/}
            {/*                    <div className={'col-lg-6'}>*/}
            {/*                        <div className={AUStyle.Desc}>*/}
            {/*                            <p>{aboutUsContent.equipment.body}</p>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className={'row'}>*/}
            {/*                    <div className={'col-lg-12'}>*/}
            {/*                        <InnerSlider component={'equipment'} equipment={equipment} perPage={4}/>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
            {/*<QualityControl qualityControl={qualityControl}/>*/}
        </>
    );
};



export async function getServerSideProps(ctx) {
    console.log(aboutUsUrl);
    const aboutUsContent = await fetch(aboutUsUrl + `&lang=${ctx.locale}`)
        .then(res=>res.json())
        .then(data=>data)
    //console.log(aboutUsContent);
    /*const doctors = await fetch(doctorsUsUrl)
        .then(res=>res.json())
        .then(data=>data)

    const equipment = await fetch(equipmentUrl)
        .then(res=>res.json())
        .then(data=>data)

    const qualityControl = await fetch(qualityControlUrl)
        .then(res=>res.json())
        .then(data=>data)*/


    return {
        props:{
            aboutUsContent,
            //doctors,
            //equipment,
            //qualityControl
        }
    }
}

export default AboutUs;