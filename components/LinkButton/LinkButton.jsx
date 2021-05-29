import React from "react";
import linkButtonStyle from './linkButton.module.scss'

const LinkButton = ({text})=>{
    return(
        <a className={linkButtonStyle.Link}>{text}</a>
    )
}

export default LinkButton