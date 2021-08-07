import React from 'react';
import {analyzesCategoryUrl, analyzesUrl} from "../../utils/url";
import {resetIdCounter} from "react-tabs";
import AnalyzesList from "../../components/AnalyzesList/AnalyzesList";





const Analyzes = ({ analyzes, categories, allCategories, loc, page}) => {

    return (
        <>
            <AnalyzesList
                analyzes={analyzes}
                categories={categories}
                allCategories={allCategories}
                loc={loc}
                page={page}
            />
        </>
    );
};




export async function getServerSideProps(ctx) {
    resetIdCounter();
    const page = ctx.query.page = 1
    const start = page === 1 ? 0 : (page - 1) * 10

    const categories = await fetch( `${analyzesCategoryUrl}?${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&parent=0&orderby=slug`)
        .then(res => res.json())
        .then(data => data)

    const allCategories = await fetch(`${analyzesCategoryUrl}?${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&per_page=100&parent=${categories[0] ? categories[0].id : ''}`)
        .then(res => res.json())
        .then(data => data)

    const analyzes = await fetch( `${analyzesUrl}?${ctx.locale !== 'hy' ? `lang=${ctx.locale}` : ''}&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&category=${categories[0] ? categories[0].id : ''}&offset=${start}&order=asc`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    const totalNumberOfAnalyzes = analyzes.length

    return {
        props: {
            analyzes,
            categories,
            allCategories,
            page
        }
    }
}

export default Analyzes;
