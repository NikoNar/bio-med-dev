import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {getNavBarItems} from "../../redux/actions/navBarAction";
import NavStyle from './navigation.module.scss'
import DropDownNavBarInner from "./SubLinks/DropDownNavBarInner";
import {useRouter, withRouter} from "next/router";

const NavBar = ({loc})=>{
    const dispatch = useDispatch()
    const pages =useSelector(state=>state.navigation)
    const router = useRouter()

    useEffect(()=>{
        dispatch(getNavBarItems(loc && loc))
    }, [loc])


    return (
        <nav className={NavStyle.NavBarMain}>
            <ul>
                {
                    pages.items && pages.items.map((item)=>{
                        return(
                            <li key={item.ID} className={ item.child_items ? NavStyle.HasChild : null }>
                                <Link href={item.slug && item.menu_item_parent === '0' ? `/${item.slug}` : `/page?title=${item.slug}`} activeClassName="active">
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