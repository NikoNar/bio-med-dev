import React from "react";
import linkButtonStyle from './linkButton.module.scss'
import Link from "next/link";


const LinkButton = ({text, link}) => {

    return (
        <Link href={`${link}`}>
            <a className={linkButtonStyle.Link}>{text}</a>
        </Link>
    )
}

export default LinkButton