import React from 'react';
import {analyzesCategoryUrl, analyzesTypesUrl, analyzesUrl, callHomeUrl} from "../../utils/url";
import {resetIdCounter} from "react-tabs";
import Pagination from "../../components/Pagination/Pgination";
import AnalyzesList from "../../components/AnalyzesList/AnalyzesList";





const Analyzes = ({ analyzes, categories}) => {

    return (
        <>
            <AnalyzesList analyzes={analyzes} categories={categories}/>
            <Pagination/>
        </>
    );
};




export async function getServerSideProps() {
    resetIdCounter();

    const categories = await fetch(analyzesCategoryUrl)
        .then(res=>res.json())
        .then(data=>data)

    const analyzes = await fetch(analyzesUrl, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    return {
        props: {
            analyzes: analyzes,
            categories:categories
        }
    }
}

export default Analyzes;