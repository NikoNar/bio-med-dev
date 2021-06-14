import React from 'react';
import {useSelector} from "react-redux";
import AnalyzesCard from "../../components/AnalyzesCard/AnalyzesCard";
import SearchStyle from './search.module.scss'

const Search = () => {

    const results = useSelector(state => state.search)

    console.log(process.env.HOSTNAME)
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
                        results && results.map((res) => {
                            return (
                                <div className={'col-lg-12 mb-5'} key={res.title}>
                                    <AnalyzesCard inner={res}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    );
};

export default Search;