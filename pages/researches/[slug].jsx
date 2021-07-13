import React, {useEffect, useState} from 'react';
import SAnalyseStyle from "./single-analyse.module.scss";
import {resetIdCounter, Tab, TabList, TabPanel} from "react-tabs";
import dynamic from "next/dynamic";
import Button from "../../components/Button/Button";
import {analyzesCategoryUrl, analyzesUrl, contactInfoUrl, locationsUrl} from "../../utils/url";
import ContactInfoWithSelect from "../../components/ContactUs/ContacInfoWithSelect/ContacInfoWithSelect";
import useTranslation from "next-translate/useTranslation";
import EmergencyIcon from "../../components/SVGIcons/Emergency/EmergencyIcon";
import {addItemToCart} from "../../redux/actions/setOrderAction";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserAction} from "../../redux/actions/getCurrentUserAction";
import TabComponent from "../../components/Tab/Tab";
import {useRouter} from "next/router";
import parse from 'html-react-parser'


const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), {ssr: true})


const SingleAnalyse = ({analyzes, contactInfo, singleAnalyse, categories, t, loc}) => {

    const router = useRouter()
    const backgroundColor = 'linear-gradient(208deg,' + 'transparent 11px,' + '#52A4E3 0)'
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()

    const addresses = contactInfo.map((cont)=>{
        return{
            value: cont.slug,
            label: cont.location_address,
            email: cont.location_email,
            tel: cont.location_phone
        }
    })

    const handleAddToCart = (data) => {
        dispatch(addItemToCart(data))
    }

    return (
        <>

            <section className={SAnalyseStyle.Single}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-lg-12'}>
                            <div className={SAnalyseStyle.Header}>
                                <div className={SAnalyseStyle.Number}>
                                    <p>№ <span>{singleAnalyse[0].id}</span></p>
                                </div>
                                <div className={SAnalyseStyle.Category}>
                                    {singleAnalyse[0].name}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'row mb-5'}>
                        <div className={'col-lg-8'}>
                            <div className={SAnalyseStyle.Title}>
                                {parse(singleAnalyse[0].description)}
                            </div>
                        </div>
                        <div className={'col-lg-4'}>
                            <div className={SAnalyseStyle.Price}>
                                <p style={{display: singleAnalyse[0].sale_price ? 'block': 'none'}}>{singleAnalyse[0].sale_price}<span className="_icon-amd"></span></p>
                                <p className={singleAnalyse[0].sale_price ? SAnalyseStyle.OldPrice : ''}>{singleAnalyse[0].regular_price}<span className="_icon-amd"></span></p>
                            </div>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'col-lg-8'}>
                            <div className={SAnalyseStyle.Body}>
                                <div className={SAnalyseStyle.Switcher}>
                                    <div className={SAnalyseStyle.Inner}>
                                        <Tabs>
                                            <TabList className={SAnalyseStyle.TabList}>
                                                {
                                                    singleAnalyse[0].attributes && singleAnalyse[0].attributes.length > 0 && singleAnalyse[0].attributes.map((cont)=>{
                                                        return (
                                                            <Tab selectedClassName={SAnalyseStyle.Selected} key={cont.name && cont.name}>
                                                                <span>{cont.name.split('-').join(' ')}</span>
                                                            </Tab>
                                                        )
                                                    })
                                                }
                                            </TabList>
                                            {
                                                singleAnalyse[0].attributes.length > 0 && singleAnalyse[0].attributes.map((cont)=>{
                                                    return(
                                                        <TabPanel key={cont.position}>
                                                            <div className={SAnalyseStyle.InnerText}>
                                                                <p>{cont.options[0]}</p>
                                                            </div>
                                                        </TabPanel>
                                                    )
                                                })
                                            }
                                        </Tabs>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'col-lg-4 mt-5 mt-lg-0'}>
                            <div className={SAnalyseStyle.Button}>
                                <div className={SAnalyseStyle.Image}>
                                    <EmergencyIcon/>
                                </div>
                                <Button
                                    text={t('common:add_to_cart')}
                                    backgroundColor={backgroundColor}
                                    icon={false}
                                    callBack={
                                        currentUser ? () => handleAddToCart({...singleAnalyse[0], userId: currentUser.id}) :
                                            ()=>{router.push('/account')}
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={SAnalyseStyle.Slider}>
                <TabComponent analyzes={analyzes} t={t} loc={loc} categories={categories}/>
            </section>
            <section>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-lg-12'}>
                            <ContactInfoWithSelect contactInfo={contactInfo} loc={loc} addresses={addresses}/>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};

export async function getServerSideProps(ctx) {

    resetIdCounter();

    const categories = await fetch(analyzesCategoryUrl + `?lang=${ctx.locale}` + `&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&parent=0&orderby=slug`)
        .then(res => res.json())
        .then(data => data)

    const analyzes = await fetch(analyzesUrl + `?lang=${ctx.locale}` + `&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&category=${categories[0].id}`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    const contactInfo = await fetch(`${locationsUrl}?status=publish&lang=${ctx.locale}`)
        .then(res => res.json())
        .then(data => data)

    const singleAnalyse = await fetch(`${analyzesUrl}?${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&slug=${ctx.query.slug}&lang=${ctx.locale}`)
        .then(res => res.json())
        .then(data => data)


    return {
        props: {
            analyzes,
            contactInfo,
            singleAnalyse,
            categories
        }
    }
}


export default SingleAnalyse;
