import React from 'react';
import {analyzesCategoryUrl, analyzesUrl} from "../../utils/url";
import {resetIdCounter} from "react-tabs";
import Pagination from "../../components/Pagination/Pgination";
import AnalyzesList from "../../components/AnalyzesList/AnalyzesList";





const Analyzes = ({ analyzes, categories, allCategories, loc}) => {

    return (
        <>
            <AnalyzesList
                analyzes={analyzes}
                categories={categories}
                allCategories={allCategories}
                loc={loc}
            />
            <Pagination/>
        </>
    );
};




export async function getServerSideProps(ctx) {
    resetIdCounter();

    const page = ctx.query.page = 1


    const categories = await fetch(analyzesCategoryUrl + `?lang=${ctx.locale}` + `&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&parent=0&orderby=slug`)
        .then(res => res.json())
        .then(data => data)

    const allCategories = await fetch(analyzesCategoryUrl + `?lang=${ctx.locale}` + `&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&parent=${categories[0].id}`)
        .then(res => res.json())
        .then(data => data)



    const analyzes = await fetch(analyzesUrl + `?lang=${ctx.locale}` + `&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&category=${categories[0].id}`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    return {
        props: {
            analyzes,
            categories,
            page,
            allCategories,
        }
    }
}

export default Analyzes;
