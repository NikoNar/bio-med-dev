import React, {useState} from 'react';
import {makeSearch} from "../../../redux/actions/searchAction";
import HeaderStyle from "../../Header/header.module.scss";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";
import {useDispatch} from "react-redux";

const Search = ({setIsOpen, loc}) => {
    console.log(loc);
    const {t} = useTranslation()
    const dispatch = useDispatch()

    const [searchData, setSearchData] = useState('')
    const router = useRouter()

    const handleSearchData = (e)=>{
        setSearchData(e.target.value)
    }

    const handleSearchSubmit = async (e)=>{
        e.preventDefault()
        dispatch(makeSearch(searchData, loc))
        await router.push('/search')
        setSearchData('')
        setTimeout(()=>{
            setIsOpen(false)
        },500)
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
