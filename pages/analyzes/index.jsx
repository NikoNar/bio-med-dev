import React from 'react';
import {analyzesCategoryUrl, analyzesUrl} from "../../utils/url";
import {resetIdCounter} from "react-tabs";
import Pagination from "../../components/Pagination/Pgination";
import AnalyzesList from "../../components/AnalyzesList/AnalyzesList";





const Analyzes = ({ analyzes, categories, page}) => {
console.log(page);
    return (
        <>
            <AnalyzesList analyzes={analyzes} categories={categories}/>
            <Pagination/>
        </>
    );
};




export async function getServerSideProps({query:{page=1}}) {
    resetIdCounter();

    const categories = await fetch(analyzesCategoryUrl)
        .then(res=>res.json())
        .then(data=>data)

    const analyzes = await fetch(analyzesUrl + `?_limit=3`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    return {
        props: {
            analyzes: analyzes,
            categories:categories,
            page
        }
    }
}

export default Analyzes;