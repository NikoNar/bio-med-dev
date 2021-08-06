import React from 'react';
import NPStyle from './npm.module.scss'
import useTranslation from "next-translate/useTranslation";

const NextPrevPagination = ({prevSearchResults, nextSearchResults, page, res}) => {
    const {t} = useTranslation()
    return (
        <div className={NPStyle.Wrapper}>
            <ul>
                <li>
                    <button onClick={prevSearchResults} disabled={page<=1}>{t('common:next')}</button>
                </li>
                <li>
                    <button onClick={nextSearchResults} disabled={res.length <= 0}>{t('common:prev')}</button>
                </li>
            </ul>
        </div>
    );
};

export default NextPrevPagination;
