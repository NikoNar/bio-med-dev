import React from "react";
import linkButtonStyle from '../LinkButton/linkButton.module.scss'



const TabButtons = ({text}) => {
    return <span className={linkButtonStyle.Link}>{text}</span>
}

export default TabButtons