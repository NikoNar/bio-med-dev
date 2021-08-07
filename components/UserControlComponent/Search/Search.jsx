import React, {useState} from 'react';
import HeaderStyle from "../../Header/header.module.scss";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";
import {searchUrl} from "../../../utils/url";


const Search = ({loc}) => {
    const {t} = useTranslation()

    const [searchData, setSearchData] = useState('')
    const router = useRouter()

    const handleSearchData = (e)=>{
        setSearchData(e.target.value)
    }

    const handleSearchSubmit = async (e)=>{
        e.preventDefault()
        await fetch(`${searchUrl}&lang=${loc}&search=${searchData}&page=1`, {
            method: 'GET'
        })
            .then(res=> {
                const totalSearchResults = res.headers.get('x-wp-total')
                const totalPages = res.headers.get('x-wp-totalpages')
                const results = JSON.stringify(totalSearchResults)
                const pages = JSON.stringify(totalPages)
                localStorage.setItem('resultsCount', results)
                localStorage.setItem('pagesCount', pages)
                return res.json()
            })
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
        <>
            <form onSubmit={(e)=>handleSearchSubmit(e)} className={'mb-4 mb-lg-0 mb-md-0'}>
                <div className={HeaderStyle.SearchWrapper}>
                    <input placeholder={t('common:search')} type="text" value={searchData} onChange={(e)=>handleSearchData(e)}/>
                    <button type='submit' disabled={!searchData}></button>
                </div>
            </form>
        </>
    );
};

export default Search;
