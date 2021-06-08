import React from 'react';
import HCStyle from './home-cloud.module.scss'
import CloseIcon from "../SVGIcons/CloseIcon/CloseIcon";


const HomeCallCloudText = ({callback, style}) => {

    return (
        <div className={HCStyle.Cloud} style={style}>
            <p>
                Այս ծառայությունից օգտվելու համար ըտրված բոլոր հետազոտեւթյունները պետք է ունենան "Կանչ Տուն" տարբերակը։
            </p>
            <div className={HCStyle.RemoveBtn}>
                <button onClick={callback}><CloseIcon color={'#ffffff'}/></button>
            </div>
        </div>
    );
};

export default HomeCallCloudText;