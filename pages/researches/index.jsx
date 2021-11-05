import React, {useEffect, useState} from 'react';
import {analyzesCategoryUrl, analyzesUrl, researchUrl} from "../../utils/url";
import {resetIdCounter} from "react-tabs";
import AnalyzesList from "../../components/AnalyzesList/AnalyzesList";
import HCStyle from "../call-home/home-call.module.scss"
import parse from 'html-react-parser';



const Analyzes = ({ analyzes, categories, allCategories, loc, page, totalPages, totalAnalyzesCount, researches}) => {
 
    return (
        <>
            <section className={HCStyle.HomeCall}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-lg-6'}>
                            <div className={HCStyle.Wrapper}>
                                <div className={HCStyle.Content}>
                                    {parse(researches[0].content.rendered)}
                                </div>
                            </div>
                        </div>
                        <div className={'col-lg-6 order-first order-lg-last mb-5 mb-lg-0'}>
                            <div className={HCStyle.IconWrapper}>
                                <div className={HCStyle.Icon}>
                                    <img src={researches[0]._embedded['wp:featuredmedia'] ? researches[0]._embedded['wp:featuredmedia'][0].source_url : ''}/>     
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </section>
            <AnalyzesList
                analyzes={analyzes}
                categories={categories}
                allCategories={allCategories}
                loc={loc}
                page={page}
                totalPages={totalPages}
                totalAnalyzesCount={totalAnalyzesCount}
            />
        </>
    );
};




export async function getServerSideProps(ctx) {
    resetIdCounter();
    const page = ctx.query.page = 1
    const start = page === 1 ? 0 : (page - 1) * 10
    let totalAnalyzesCount
    let totalPages
    const categories = await fetch( `${analyzesCategoryUrl}?${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&parent=0&orderby=slug`)
        .then(res => {
           return  res.json()
        })
        .then(data => data.reverse())
        
    const researches = await fetch(`${researchUrl}&${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}&_embed`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)


    const allCategories = await fetch(`${analyzesCategoryUrl}?${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&per_page=100&parent=${categories[0] ? categories[0].id : ''}`)
        .then(res => {
            return res.json()
        })
        .then(data => data)

    const analyzes = await fetch( `${analyzesUrl}?${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&category=${categories[0] ? categories[0].id : ''}&offset=${start}&order=asc`, {
        method: 'GET',
    })
        .then(res => {
            totalAnalyzesCount =  res.headers.get('x-wp-total')
            totalPages =  res.headers.get('x-wp-totalpages')
            return res.json()
        })
        .then(data => data)

    return {
        props: {
            analyzes,
            categories,
            allCategories,
            page,
            totalAnalyzesCount,
            totalPages,
            researches
        }
    }
}

export default Analyzes;


