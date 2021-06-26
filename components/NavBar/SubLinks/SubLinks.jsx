import React from 'react';
import Link from "next/link";
import DropDownNavBarInner from "./DropDownNavBarInner";
import NavStyle from "../navigation.module.scss";

const SubLinks = ({link}) => {
    return (
        <li className={link.child_items ? NavStyle.HasChild : null}>
            <Link href={link.slug && link.menu_item_parent ==="0" ? link.slug: `/page?title=${link.slug}`} key={link.id}>
                <a>
                    {link.title}
                </a>
            </Link>
            <DropDownNavBarInner subLink={link.child_items ? link.child_items : null}/>
        </li>
    );
};

export default SubLinks;