import React, {useEffect, useMemo, useState} from 'react';
import AnalyzesCard from "../../components/AnalyzesCard/AnalyzesCard";
import SearchStyle from './search.module.scss'
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";
import {searchUrl} from "../../utils/url";
import NextPrevPagination from "../../components/Pagination/NextPrevPagination/NextPrevPagination";


const Search = ({loc}) => {
    const {t} = useTranslation()
    const router = useRouter()


    const [res, setRes] = useState([])
    const [word, setWord] = useState('')
    const [resCount, setResCount] = useState()
    const [resPagesCount, setResPagesCount] = useState()

    const [page, setPage] = useState(1)



    function getResults(){

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
    }


    useEffect(()=>{
        setPage(1)
        getResults()
    }, [router])

    async function fetchSearchResultsWithPage(page){

        await fetch(`${searchUrl}&lang=${loc}&search=${word}&page=${page}`, {
            method: 'GET'
        })
            .then(res=> {
                const totalSearchResults = res.headers.get('x-wp-total')
                const totalPages = res.headers.get('x-wp-totalpages')
                setResPagesCount(totalPages)
                setResCount(totalSearchResults)
                setWord(word)
                return res.json()
            })
            .then(data=>{
                localStorage.removeItem('searchResults')
                localStorage.removeItem('resultsCount')
                localStorage.removeItem('pagesCount')
                localStorage.removeItem('searchKeyWord')
                setRes(data)
            })
    }


    const prevSearchResults = ()=>{
        setPage(page - 1)
        fetchSearchResultsWithPage(page - 1, word)
    }
    const nextSearchResults = ()=>{
        setPage(page + 1)
        fetchSearchResultsWithPage(page + 1, word)
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
                                <p>{t('common:nothing_was_found_for_your_search')}</p>
                            </div>
                    }
                </div>
                {
                    resPagesCount > 1 ? <NextPrevPagination
                        nextSearchResults={nextSearchResults}
                        prevSearchResults={prevSearchResults}
                        page={page}
                        res={res} t={t}
                        totalPages={resPagesCount}
                    /> : null
                }
            </div>
        </section>
    );
};

export default Search;

