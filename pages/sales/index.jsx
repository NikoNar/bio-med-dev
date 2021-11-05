import React from 'react';
import {resetIdCounter} from "react-tabs";
import {analyzesCategoryUrl, analyzesUrl, dynamicPageUrl} from "../../utils/url";
import HCStyle from "./sales.module.scss"
import AnalyzesList from "../../components/AnalyzesList/AnalyzesList";
import parse from 'html-react-parser';


const Sales = ({analyzes, categories, analyzesEquip, analyzesLab, loc, allCategories, totalPages, sales}) => {

    return (
        <>
            <section className={HCStyle.HomeCall}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-lg-6'}>
                            <div className={HCStyle.Wrapper}>
                                <div className={HCStyle.Content}>
                              
                                    {parse(sales[0].content.rendered)}
                                </div>
                            </div>
                        </div>
                        <div className={'col-lg-6 order-first order-lg-last mb-5 mb-lg-0'}>
                            <div className={HCStyle.IconWrapper}>
                                <div className={HCStyle.Icon}>
                                    <img src={sales[0]._embedded['wp:featuredmedia'] ? sales[0]._embedded['wp:featuredmedia'][0].source_url : ''}/> 
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
                totalPages={totalPages}
                mainCategoryId = {categories[0] && categories[0].id}
            />
        </>
    );
};


export async function getServerSideProps(ctx) {
    resetIdCounter();
    let totalAnalyzesCount
    let totalPages
    const page = ctx.query.page = 1
    const start = page === 1 ? 0 : (page - 1) * 10

    const categories = await fetch(`${analyzesCategoryUrl}?${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&parent=0&orderby=slug`)
        .then(res => res.json())
        .then(data => data.reverse())

    const analyzes = await fetch( `${analyzesUrl}${ctx.locale !== 'hy' ? `?lang=${ctx.locale}&` : '?'}${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&category=${categories[0] ? categories[0].id : ''}&offset=${start}&order=asc`, {
        method: 'GET',
    })
        .then(res => {
            totalAnalyzesCount =  res.headers.get('x-wp-total')
            totalPages =  res.headers.get('x-wp-totalpages')
            return res.json()
        })
        .then(data => data)

    const sales = await fetch(`${dynamicPageUrl}&slug=sales&${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}&_embed`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)


    const allCategories = await fetch(`${analyzesCategoryUrl}?${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&parent=${categories[0] ? categories[0].id : ''}`)
        .then(res => res.json())
        .then(data => data)



    return {
        props: {
            analyzes: analyzes,
            sales,
            categories,
            allCategories,
            totalPages
        }
    }
}


export default Sales;
