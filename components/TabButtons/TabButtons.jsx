import React from "react";
import linkButtonStyle from '../LinkButton/linkButton.module.scss'



const TabButtons = ({text, dataName, callBack}) => {
    return <span className={linkButtonStyle.Link} data-value={dataName} onClick={callBack}>{text}</span>
}

export default TabButtons