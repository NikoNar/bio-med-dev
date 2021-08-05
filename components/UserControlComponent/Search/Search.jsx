import React, {useState} from 'react';
import {makeSearch} from "../../../redux/actions/searchAction";
import HeaderStyle from "../../Header/header.module.scss";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";
import {useDispatch} from "react-redux";
import {searchUrl} from "../../../utils/url";
import {setCookie} from "nookies";

const Search = ({setIsOpen, loc, pageProps}) => {
    const {t} = useTranslation()
    const dispatch = useDispatch()

    const [searchData, setSearchData] = useState('')
    const router = useRouter()

    const handleSearchData = (e)=>{
        setSearchData(e.target.value)
    }

    const handleSearchSubmit = async (e)=>{
        e.preventDefault()
        //dispatch(makeSearch(searchData, loc, setIsOpen))
        await fetch(`${searchUrl}&lang=${loc}&search=${searchData}`, {
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
