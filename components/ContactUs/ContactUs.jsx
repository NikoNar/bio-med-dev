import React, {useEffect} from 'react';
import ContStyle from './contact.module.scss'
import MapComponent from "./Map/Map";
import {useDispatch, useSelector} from "react-redux";
import {getLocation} from "../../redux/actions/getLocationsAction";
import ContactFrom from "./ContactForm/ContactFrom";
import ContactInfoWithSelect from "./ContacInfoWithSelect/ContacInfoWithSelect";
import parse from 'html-react-parser'
import {useRouter} from "next/router";


const ContactUs = ({contactInfo, t, contactPageInfo}) => {

    const router = useRouter()
    const loc = router.locale

    const locations = useSelector(state=>state.locations)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getLocation(loc))
    },[loc])



    const addresses = contactInfo.map((cont)=>{
        return{
            value: cont.slug,
            label: cont.location_address,
            email: cont.location_email,
            tel: cont.location_phone
        }
    })



    return (
        <section className={ContStyle.ContactUs}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-5'}>
                        <div className={ContStyle.Form}>
                            <div className={ContStyle.Title}>
                                <h4>{t('common:contact_us')}</h4>
                                {parse(contactPageInfo[0].content && contactPageInfo[0].content.rendered)}
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
            </div>
            <ContactInfoWithSelect addresses={addresses} loc={loc}/>
        </section>
    );
};

export default ContactUs;
