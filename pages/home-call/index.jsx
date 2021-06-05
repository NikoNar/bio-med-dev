import React from 'react';
import Analyzes from "../analyzes";
import {resetIdCounter} from "react-tabs";
import {analyzesTypesUrl, analyzesUrl, callHomeUrl} from "../../utils/url";
import HCStyle from "./home-call.module.scss"
import EmergencyIcon from "../../components/SVGIcons/Emergency/EmergencyIcon";

const CallHome = ({analyzesTypes, analyzes, homeCall}) => {
    return (
        <>
            <section className={HCStyle.HomeCall}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-lg-6'}>
                            {
                                homeCall ? homeCall.map((text, index) => {
                                    return (
                                        <div className={HCStyle.Wrapper} key={index}>
                                            <div className={HCStyle.Title}>
                                                <h4>{text.title}</h4>
                                                {
                                                    text.body ? text.body.map((p, index) => {
                                                        return <p key={index}>{p}</p>
                                                    }) : ''
                                                }
                                            </div>
                                        </div>
                                    )
                                }) : ''
                            }
                        </div>
                        <div className={'col-lg-6 order-first order-lg-last mb-5 mb-lg-0'}>
                            <div className={HCStyle.IconWrapper}>
                                <div className={HCStyle.Icon}>
                                    <EmergencyIcon/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Analyzes analyzes={analyzes} analyzesTypes={analyzesTypes}/>
        </>
    );
};


export async function getServerSideProps() {
    resetIdCounter();
    const analyzesTypes = await fetch(analyzesTypesUrl)
        .then(res => res.json())
        .then(data => data)

    const analyzes = await fetch(analyzesUrl, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    const homeCall = await fetch(callHomeUrl, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)


    return {
        props: {
            analyzesTypes: analyzesTypes,
            analyzes: analyzes,
            homeCall
        }
    }
}


export default CallHome;