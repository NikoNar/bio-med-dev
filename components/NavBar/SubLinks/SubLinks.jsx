import React from 'react';
import Link from "next/link";
import DropDownNavBarInner from "./DropDownNavBarInner";
import NavStyle from "../navigation.module.scss";

const SubLinks = ({link}) => {

    return (
        <li className={link.subLinks ? NavStyle.HasChild : null}>
            <Link href={link.link ? link.link: ''} key={link.id}>
                <a>
                    {link.title}
                </a>
            </Link>
            <DropDownNavBarInner subLink={link.subLinks ? link.subLinks : null}/>
        </li>
    );
};

export default SubLinks;