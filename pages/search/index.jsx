import React from 'react';
import {useSelector} from "react-redux";
import AnalyzesCard from "../../components/AnalyzesCard/AnalyzesCard";
import SearchStyle from './search.module.scss'
import useTranslation from "next-translate/useTranslation";

const Search = () => {
    const {t} = useTranslation()
    const results = useSelector(state => state.search)

    return (
        <section className={SearchStyle.Search}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <h4>{t('common:search_results')}</h4>
                    </div>
                </div>
                <div className={'row'}>
                    <p>{t('common:you_were_looking_for')} <strong style={{color: '#ff0000'}}>{results.keyWord ? results.keyWord : ''}</strong></p>
                    <p>{t('common:results')} <strong style={{color: '#ff0000'}}>{Object.entries(results).length > 0 && results.results.length > 0 ? results.results.length : '0'}</strong></p>
                    {
                        Object.entries(results).length > 0 && results.results.length > 0 ? results.results.map((res) => {
                            return (
                                <div className={'col-lg-12 mb-5'} key={res.title}>
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