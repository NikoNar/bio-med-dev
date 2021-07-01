import React from "react";
import Link from "next/link";
import NavStyle from './navigation.module.scss'
import DropDownNavBarInner from "./SubLinks/DropDownNavBarInner";
import {useRouter, withRouter} from "next/router";

const NavBar = ({pages})=>{

    const router = useRouter()

    return (
        <nav className={NavStyle.NavBarMain}>
            <ul>
                {
                    pages.items && pages.items.map((item)=>{
                        return(
                            <li key={item.ID} className={ item.child_items ? NavStyle.HasChild : null }>
                                <Link href={item.slug && item.menu_item_parent === '0' ? `/${item.slug}` : !item.slug  ? '/' : `/page?title=${item.slug}`} activeClassName="active">
                                    <a className={router.asPath === `/${item.slug}` ? NavStyle.Active : " "}>
                                            {item.title}
                                    </a>
                                </Link>
                                <DropDownNavBarInner subLink={item.child_items ? item.child_items : null}/>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}


export default withRouter(NavBar)