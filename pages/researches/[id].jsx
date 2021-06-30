import React, {useEffect, useState} from 'react';
import SAnalyseStyle from "./single-analyse.module.scss";
import {resetIdCounter, Tab, TabList, TabPanel} from "react-tabs";
import dynamic from "next/dynamic";
import Button from "../../components/Button/Button";
import {analyzesCategoryUrl, analyzesUrl, contactInfoUrl} from "../../utils/url";
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


const SingleAnalyse = ({analyzes, contactInfo, singleAnalyse, categories}, pageProps) => {

    const {t} = useTranslation()
    const router = useRouter()
    const backgroundColor = 'linear-gradient(208deg,' + 'transparent 11px,' + '#52A4E3 0)'
    console.log(singleAnalyse);
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()

    useEffect(() => {
        //dispatch(getCurrentUserAction())
    }, [])

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
                                    <p>№ <span>{singleAnalyse.id}</span></p>
                                </div>
                                <div className={SAnalyseStyle.Category}>
                                    {parse(singleAnalyse.name)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'row mb-5'}>
                        <div className={'col-lg-8'}>
                            <div className={SAnalyseStyle.Title}>
                                {parse(singleAnalyse.description)}
                            </div>
                        </div>
                        <div className={'col-lg-4'}>
                            <div className={SAnalyseStyle.Price}>
                                <p style={{display: singleAnalyse.sale_price ? 'block': 'none'}}>{singleAnalyse.sale_price}<span className="_icon-amd"></span></p>
                                <p className={singleAnalyse.sale_price ? SAnalyseStyle.OldPrice : ''}>{singleAnalyse.regular_price}<span className="_icon-amd"></span></p>
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
                                                {/*{*/}
                                                {/*    singleAnalyse.description.map((cont)=>{*/}
                                                {/*        return (*/}
                                                {/*            <Tab selectedClassName={SAnalyseStyle.Selected} key={cont.tabTitle}>*/}
                                                {/*                <span>{cont.tabTitle}</span>*/}
                                                {/*            </Tab>*/}
                                                {/*        )*/}
                                                {/*    })*/}
                                                {/*}*/}
                                            </TabList>
                                            {/*{*/}
                                            {/*    singleAnalyse.content.map((cont)=>{*/}
                                            {/*        return(*/}
                                            {/*            <TabPanel key={cont.id}>*/}
                                            {/*                <div className={SAnalyseStyle.InnerText}>*/}
                                            {/*                    <p>{cont}</p>*/}
                                            {/*                </div>*/}
                                            {/*            </TabPanel>*/}
                                            {/*        )*/}
                                            {/*    })*/}
                                            {/*}*/}
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
                                        currentUser ? () => handleAddToCart({...singleAnalyse, userId: currentUser.id}) :
                                            ()=>{router.push('/account')}
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*<section className={SAnalyseStyle.Slider}>*/}
            {/*    <TabComponent analyzes={analyzes}/>*/}
            {/*</section>*/}
            {/*<section>*/}
            {/*    <div className={'container'}>*/}
            {/*        <div className={'row'}>*/}
            {/*            <div className={'col-lg-12'}>*/}
            {/*                <ContactInfoWithSelect contactInfo={contactInfo}/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
        </>

    );
};

export async function getServerSideProps(ctx) {

    resetIdCounter();

    const analyzes = await fetch(analyzesUrl, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    // const contactInfo = await fetch(contactInfoUrl, {
    //     method: 'GET',
    // })
    //     .then(res => res.json())
    //     .then(data => data)

    const singleAnalyse = await fetch(analyzesUrl + `/${ctx.query.id}` + `?lang=${ctx.locale}` + `&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`)
        .then(res => res.json())
        .then(data => data)

    const categories = await fetch(analyzesCategoryUrl)
        .then(res=>res.json())
        .then(data=>data)

    return {
        props: {
            analyzes,
            //contactInfo,
            singleAnalyse,
            categories
        }
    }
}


export default SingleAnalyse;