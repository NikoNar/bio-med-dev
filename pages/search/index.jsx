import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useSelector} from "react-redux";
import AnalyzesCard from "../../components/AnalyzesCard/AnalyzesCard";
import SearchStyle from './search.module.scss'
import useTranslation from "next-translate/useTranslation";
import {parseCookies} from "nookies";
import {useRouter} from "next/router";

const Search = ({loc}) => {
    const {t} = useTranslation()
    const [res, setRes] = useState([])
    const [word, setWord] = useState('')
    const router = useRouter()

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
            </div>
        </section>
    );
};

export default Search;

