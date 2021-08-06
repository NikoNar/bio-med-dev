import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useSelector} from "react-redux";
import AnalyzesCard from "../../components/AnalyzesCard/AnalyzesCard";
import SearchStyle from './search.module.scss'
import useTranslation from "next-translate/useTranslation";
import {parseCookies} from "nookies";
import {useRouter} from "next/router";
import Pagination from "../../components/Pagination/Pgination";
import {searchUrl} from "../../utils/url";
import NextPrevPagination from "../../components/Pagination/NextPrevPagination/NextPrevPagination";

const Search = ({loc, limit, start, page}) => {
    const {t} = useTranslation()
    const [res, setRes] = useState([])
    const [word, setWord] = useState('')
    const router = useRouter()
    const [searchData, setSearchData] = useState('')
    const [pages, setPages] = useState(page)
    useEffect(()=>{
        const keyWordJson = localStorage.getItem('searchKeyWord')
        const keyWord = keyWordJson ? JSON.parse(keyWordJson) : ''
        const resultsJson = localStorage.getItem('searchResults')
        const results = resultsJson ? JSON.parse(resultsJson) : []
        setRes(results)
        setWord(keyWord)
        if (router.locale){
            localStorage.removeItem('searchResults')
            localStorage.removeItem('searchKeyWord')
        }
    }, [t])

    const prevSearchResults = async ()=>{
        setPages(pages - 1)
        await fetch(`${searchUrl}&lang=${loc}&search=${searchData}&offset=${start}&page=${pages}`, {
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

    const nextSearchResults = async ()=>{
        setPages(pages + 1)
        await fetch(`${searchUrl}&lang=${loc}&search=${searchData}&offset=${start}&page=${pages}`, {
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
                    <p>{t('common:results')} <strong style={{color: '#ff0000'}}>{res && res.length > 0 ? res.length : '0'}</strong></p>
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
                    res.length >= 10 ? <NextPrevPagination nextSearchResults={nextSearchResults} prevSearchResults={prevSearchResults} page={pages} res={res} t={t}/> : null
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

