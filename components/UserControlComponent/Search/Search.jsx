import React, {useEffect, useState} from 'react';
import HeaderStyle from "../../Header/header.module.scss";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";
import {getSearchResults} from "../../../redux/actions/searchAction";
import {useDispatch} from "react-redux";


const Search = ({loc, setIsOpen}) => {
    const {t} = useTranslation()

    const [searchData, setSearchData] = useState('')
    const router = useRouter()
    const dispatch = useDispatch()

    const handleSearchData = (e)=>{
        setSearchData(e.target.value)
    }

    useEffect(()=>{
        dispatch(getSearchResults(loc, searchData, 1))
    },[loc])

    const handleSearchSubmit = (e)=>{
        e.preventDefault()
        dispatch(getSearchResults(loc, searchData, 1))
        router.push('/search').then()
        setSearchData('')
        setIsOpen(false)
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
