import React, {useEffect, useState} from 'react';
import AnalyzesCard from "../../components/AnalyzesCard/AnalyzesCard";
import SearchStyle from './search.module.scss'
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";
import {searchUrl} from "../../utils/url";
import NextPrevPagination from "../../components/Pagination/NextPrevPagination/NextPrevPagination";


const Search = ({loc, start, page}) => {

    const {t} = useTranslation()
    const [res, setRes] = useState([])
    const [word, setWord] = useState('')
    const [resCount, setResCount] = useState()
    const [resPagesCount, setResPagesCount] = useState()

    const router = useRouter()
    const [searchData, setSearchData] = useState('')
    const [pages, setPages] = useState(page)

    useEffect(()=>{
        setPages(1)

        const keyWordJson = localStorage.getItem('searchKeyWord')
        const keyWord = keyWordJson ? JSON.parse(keyWordJson) : ''

        const resultsJson = localStorage.getItem('searchResults')
        const results = resultsJson ? JSON.parse(resultsJson) : []

        const resultsCountJson = localStorage.getItem('resultsCount')
        const resultsCount = resultsCountJson ? JSON.parse(resultsCountJson) : 0

        const resultsPagesJson = localStorage.getItem('pagesCount')
        const resultsPages = resultsPagesJson ? JSON.parse(resultsPagesJson) : 0



        setRes(results)
        setWord(keyWord)
        setResCount(resultsCount)
        setResPagesCount(resultsPages)
    }, [t])


    async function fetchSearchResultsWithPage(page){
        await fetch(`${searchUrl}&lang=${loc}&search=${searchData}&offset=${start}&page=${page}`, {
            method: 'GET'
        })
            .then(res=>res.json())
            .then(data=>{
                const results = JSON.stringify(data)
                const word = JSON.stringify(searchData)
                localStorage.setItem('searchKeyWord', word)
                localStorage.setItem('searchResults', results)
                data && router.push('/search')
            })
        setSearchData('')
    }




    const prevSearchResults = ()=>{
        setPages(pages - 1)
        fetchSearchResultsWithPage(pages - 1)
    }

    const nextSearchResults = ()=>{
        setPages(pages + 1)
        fetchSearchResultsWithPage(pages + 1)
    }


    return (
        <section className={SearchStyle.Search}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <h4>{t('common:search_results')}</h4>
                    </div>
                </div>
                <div className={'row'}>
                    <p>{t('common:you_were_looking_for')} <strong style={{color: '#ff0000'}}>{word}</strong></p>
                    <p>{t('common:results')} <strong style={{color: '#ff0000'}}>{resCount && resCount > 0 ? resCount : '0'}</strong></p>
                    {
                        res ? res.map((res) => {
                            return (
                                <div className={'col-lg-12 mb-5'} key={Math.random()}>
                                    <AnalyzesCard inner={res} id={res.id}/>
                                </div>
                            )
                        }) :
                            <div>
                                <p>{t('common:nothing_was_found_for_your_search')}

                                </p>
                            </div>
                    }
                </div>
                {
                    resPagesCount > 1 ? <NextPrevPagination nextSearchResults={nextSearchResults} prevSearchResults={prevSearchResults} page={pages} res={res} t={t} totalPages={resPagesCount}/> : null
                }
            </div>
        </section>
    );
};

export default Search;

export async function getServerSideProps({query: {page = 1}}){
    const start = page === 1 ? 0 : (page - 1) * 10
    const limit = 10

    return{
        props:{
            start,
            limit,
            page: +page,
        }
    }
}

