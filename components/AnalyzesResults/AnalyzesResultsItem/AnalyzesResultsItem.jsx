import React from 'react';
import ARStyle from "../analyzes-results.module.scss";
import useTranslation from "next-translate/useTranslation";

const AnalyzesResultsItem = ({res, openAccordion, callBack, index}) => {

    return (
        <>
            <div className={openAccordion === index ? ARStyle.Item + ' ' + ARStyle.Open : ARStyle.Item}
                 onClick={callBack}>
                <div className={ARStyle.Header}>
                    <div className={'row'}>
                        <div className={'col-lg-9'}>
                            {
                                <div className={ARStyle.HeaderTitle}>
                                    <div className={ARStyle.Number}>
                                        <p>№<span>{res.number}</span></p>
                                    </div>
                                    <p>{res.title}</p>
                                </div>
                            }
                        </div>
                        {/*<div className={'col-lg-3 mt-3 mt-lg-0'}>*/}
                        {/*    <div className={ARStyle.Date}>*/}
                        {/*        <p>{t('common:date')}։ <span>{new Date(res.date).toLocaleDateString()}</span></p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                    <div className={ARStyle.Icon}><span className={'_icon-chevrone_right'}></span></div>
                </div>
                <div className={ARStyle.Body}>
                    <table>
                        <thead>
                        {
                            !res.complexDetail ?
                                <tr>
                                    {
                                        res.table.head.map((h) => {
                                            return (
                                                <th key={Math.random()}>{h}</th>
                                            )
                                        })
                                    }
                                </tr> :
                                <tr>
                                    {
                                        res.complexDetail[0].table.head.map(h => {
                                            return (
                                                <th key={Math.random()}>{h}</th>
                                            )
                                        })
                                    }
                                </tr>
                        }
                        </thead>
                        <tbody>
                        {
                            !res.complexDetail ? <tr>
                                    {
                                        res.table.body.map((b) => {
                                            return (
                                                <td key={Math.random()}>{b}</td>
                                            )
                                        })
                                    }
                                </tr> :
                                res.complexDetail.map(c => {
                                    return (
                                        <tr>
                                            {
                                                c.table.body.map(b => {

                                                    return (
                                                        <td key={Math.random()}>{b}</td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })
                        }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AnalyzesResultsItem;
