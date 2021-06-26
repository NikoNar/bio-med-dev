import React from 'react';
import {analyzesCategoryUrl, analyzesUrl} from "../../utils/url";
import {resetIdCounter} from "react-tabs";
import Pagination from "../../components/Pagination/Pgination";
import AnalyzesList from "../../components/AnalyzesList/AnalyzesList";





const Analyzes = ({ analyzes, categories, analyzesEquip, analyzesLab}) => {

    return (
        <>
            <AnalyzesList
                analyzes={analyzes}
                //categories={categories}
                analyzesEquip={analyzesEquip}
                analyzesLab={analyzesLab}
            />
            <Pagination/>
        </>
    );
};




export async function getServerSideProps({query:{page=1}}) {
    resetIdCounter();

    const categories = await fetch(analyzesCategoryUrl)
        .then(res=>res.json())
        .then(data=>data)

    const analyzes = await fetch(analyzesUrl, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    const analyzesLab = await fetch(analyzesUrl + `?mainCategory=lab`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    const analyzesEquip = await fetch(analyzesUrl + `?mainCategory=equip`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    return {
        props: {
            analyzes: analyzes,
            categories:categories,
            page,
            analyzesLab,
            analyzesEquip
        }
    }
}

export default Analyzes;