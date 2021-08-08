import React, {useEffect, useState} from 'react';
import AnalyzesCard from "../../components/AnalyzesCard/AnalyzesCard";
import SearchStyle from './search.module.scss'
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";
import NextPrevPagination from "../../components/Pagination/NextPrevPagination/NextPrevPagination";
import {useDispatch, useSelector} from "react-redux";
import {getSearchResults} from "../../redux/actions/searchAction";


const Search = ({loc}) => {
    const {t} = useTranslation()
    const router = useRouter()
    const dispatch = useDispatch()
    const sr = useSelector(state=>state.search)

    const [word, setWord] = useState('')
    const [resCount, setResCount] = useState()
    const [resPagesCount, setResPagesCount] = useState()

    const [page, setPage] = useState(1)



    function getResults(){
        const keyWordJson = localStorage.getItem('searchKeyWord')
        const keyWord = keyWordJson ? JSON.parse(keyWordJson) : ''

        const resultsCountJson = localStorage.getItem('resultsCount')
        const resultsCount = resultsCountJson ? JSON.parse(resultsCountJson) : 0

        const resultsPagesJson = localStorage.getItem('pagesCount')
        const resultsPages = resultsPagesJson ? JSON.parse(resultsPagesJson) : 0

        setWord(keyWord && keyWord)
        setResCount(resultsCount)
        setResPagesCount(resultsPages)
    }

    useEffect(()=>{
        getResults()
    },[sr])


    useEffect(()=>{
        setPage(1)
    }, [router])

    async function fetchSearchResultsWithPage(page){
        dispatch(getSearchResults(loc, word, page))
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
                        sr ? sr.map((res) => {
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
                        res={sr}
                        t={t}
                        totalPages={resPagesCount}
                    /> : null
                }
            </div>
        </section>
    );
};

export default Search;

