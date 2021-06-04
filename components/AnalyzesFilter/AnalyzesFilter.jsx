/*
import React, {useState} from 'react';
import AnalyzesStyle from "../../pages/analyzes/Analyzes.module.scss";
import Link from "next/link";
import {setSelectedFiltersAction} from "../../redux/actions/setSelectedFiltersAction";
import {useDispatch, useSelector} from "react-redux";

const AnalyzesFilter = ({analyzesTypes, analyzes}) => {

    const dispatch = useDispatch()
    const selectedFilters = useSelector(state=>state.filters)



    const handleChange = (e)=>{
        const value = e.target.value
        const status =e.target.checked
        dispatch(setSelectedFiltersAction(value, status))
    }




    return (
        <>
            <div className={'row'}>
                <div className={'col-lg-12'}>
                    <div className={AnalyzesStyle.Header}>
                        <div className={'row'}>
                            <div className={'col-lg-12'}>
                                <div className={AnalyzesStyle.Tags}>
                                    <ul>
                                        <li className={AnalyzesStyle.Event}><Link href={'/events'}><a>ԱԿՑԻԱՆԵՐ</a></Link></li>
                                        <li className={AnalyzesStyle.Emergency}><Link href={'/home-call'}><a>ԿԱՆՉ ՏՈՒՆ</a></Link></li>
                                        {
                                            analyzesTypes ? analyzesTypes.map((item, index)=>{
                                                return(
                                                    <li key={item.id}>
                                                        <input type="checkbox" id={item.title} value={item.title} onChange={(e)=>handleChange(e)}/>
                                                        <label htmlFor={item.title}>{item.title}</label>
                                                    </li>
                                                )
                                            }) : ''
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};



export default AnalyzesFilter;*/
