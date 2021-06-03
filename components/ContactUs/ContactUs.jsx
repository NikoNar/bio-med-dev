import React, {useEffect} from 'react';
import ContStyle from './contact.module.scss'
import Button from "../Button/Button";
import MapComponent from "./Map/Map";
import {useDispatch, useSelector} from "react-redux";
import {getLocation} from "../../redux/actions/getLocationsAction";
import ContactFrom from "./ContactForm/ContactFrom";
import ContactInfoWithSelect from "./ContacInfoWithSelect/ContacInfoWithSelect";



const ContactUs = ({contactInfo}) => {

    const locations = useSelector(state=>state.locations)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getLocation())
    },[])


    return (
        <section className={ContStyle.ContactUs}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-5'}>
                        <div className={ContStyle.Form}>
                            <div className={ContStyle.Title}>
                                <h4>Հետադարձ կապ</h4>
                                <p>հանդիսացել է տպագրական արդյունաբերության ստանդարտ մոդելային տեքստ, ինչը մի անհայտ
                                    տպագրիչի</p>
                            </div>
                            <ContactFrom/>
                        </div>
                    </div>
                    <div className={'col-lg-7'}>
                        <div className={ContStyle.Wrapper}>
                            <div className={ContStyle.DecorV}>
                                <img src={'/images/c-bg.png'} alt="contact-decor"/>
                            </div>
                            <div className={ContStyle.DecorH}>
                                <img src={'/images/c-bg-h.png'} alt="contact-decor"/>
                            </div>
                            <div className={ContStyle.Map} id='map'>
                                <MapComponent locations={locations}/>
                            </div>
                        </div>
                    </div>
                </div>
                <ContactInfoWithSelect contactInfo={contactInfo}/>
            </div>
        </section>
    );
};

export default ContactUs;