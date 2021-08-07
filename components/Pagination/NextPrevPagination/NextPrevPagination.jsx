import React from 'react';
import NPStyle from './npm.module.scss'
import useTranslation from "next-translate/useTranslation";

const NextPrevPagination = ({prevSearchResults, nextSearchResults, page, res, totalPages}) => {
    const {t} = useTranslation()
    return (
        <div className={NPStyle.Wrapper}>
            <ul>
                <li>
                    <button onClick={()=>prevSearchResults()} disabled={page<=1} className={NPStyle.Prev}>{t('common:prev')}</button>
                </li>
                <li>
                    <span>{page} <small>of</small> {totalPages}</span>
                </li>
                <li>
                    <button onClick={()=>nextSearchResults()} disabled={totalPages == page} className={NPStyle.Next}>{t('common:next')}</button>
                </li>
            </ul>
        </div>
    );
};

export default NextPrevPagination;
