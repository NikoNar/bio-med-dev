import React from 'react';
import AnalyzesStyle from "../../pages/analyzes/Analyzes.module.scss";
import Link from "next/link";

const AnalyzesFilter = ({analyzesTypes, analyzes}) => {


    const filterAnalyzes = (title)=>{
        const filteredArray = analyzes.filter(item=>{
            return item.type === title
        })
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
                                            analyzesTypes ? analyzesTypes.map((item)=>{
                                                return(
                                                    <li key={item.id} onClick={()=>filterAnalyzes(item.title)}><span>{item.title}</span></li>
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



export default AnalyzesFilter;