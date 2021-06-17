import React from 'react';
import {useSelector} from "react-redux";
import AnalyzesCard from "../../components/AnalyzesCard/AnalyzesCard";
import SearchStyle from './search.module.scss'

const Search = () => {

    const results = useSelector(state => state.search)

    return (
        <section className={SearchStyle.Search}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <h4>Search results</h4>
                    </div>
                </div>
                <div className={'row'}>
                    {
                        Object.entries(results).length > 0 && results.results.length > 0 ? results.results.map((res) => {
                            return (
                                <div className={'col-lg-12 mb-5'} key={res.title}>
                                    <AnalyzesCard inner={res} id={res.id}/>
                                </div>
                            )
                        }) : <p>Sorry no any matches with your keyword <strong style={{color: '#ff0000'}}>{results.keyWord}</strong> found</p>
                    }
                </div>
            </div>
        </section>
    );
};

export default Search;