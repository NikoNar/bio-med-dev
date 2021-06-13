import React from 'react';
import HCStyle from './home-cloud.module.scss'
import CloseIcon from "../SVGIcons/CloseIcon/CloseIcon";
import useTranslation from "next-translate/useTranslation";


const HomeCallCloudText = ({callback, style}) => {
    const {t} = useTranslation()
    return (
        <div className={HCStyle.Cloud} style={style}>
            <p>{t('common:home_call_warning_text')}</p>
            <div className={HCStyle.RemoveBtn}>
                <button onClick={callback}><CloseIcon color={'#ffffff'}/></button>
            </div>
        </div>
    );
};

export default HomeCallCloudText;