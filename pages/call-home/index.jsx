import React from 'react';
import {resetIdCounter} from "react-tabs";
import {analyzesCategoryUrl, analyzesUrl, callHomeUrl} from "../../utils/url";
import HCStyle from "./home-call.module.scss"
import EmergencyIcon from "../../components/SVGIcons/Emergency/EmergencyIcon";
import AnalyzesList from "../../components/AnalyzesList/AnalyzesList";
import parse from 'html-react-parser';


const CallHome = ({analyzes, homeCall, categories, analyzesEquip, analyzesLab, loc, allCategories}) => {

    return (
        <>
            <section className={HCStyle.HomeCall}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-lg-6'}>
                            <div className={HCStyle.Wrapper}>
                                <div className={HCStyle.Content}>
                                    {parse(homeCall[0].content.rendered)}
                                </div>
                            </div>
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
            <AnalyzesList
                analyzes={analyzes}
                categories={categories}
                analyzesEquip={analyzesEquip}
                analyzesLab={analyzesLab}
                allCategories={allCategories}
                loc={loc}
            />
        </>
    );
};


export async function getServerSideProps(ctx) {
    resetIdCounter();

    const analyzes = await fetch(`${analyzesUrl}?${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    const homeCall = await fetch(`${callHomeUrl}&${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    const categories = await fetch(`${analyzesCategoryUrl}?${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&parent=0&orderby=slug`)
        .then(res => res.json())
        .then(data => data)

    const allCategories = await fetch(`${analyzesCategoryUrl}?${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&parent=${categories[0] ? categories[0].id : ''}`)
        .then(res => res.json())
        .then(data => data)



    return {
        props: {
            analyzes: analyzes,
            homeCall,
            categories,
            allCategories
        }
    }
}


export default CallHome;
