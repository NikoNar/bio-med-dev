import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {getNavBarItems} from "../../redux/actions/navBarAction";
import NavStyle from './navigation.module.scss'
import DropDownNavBarInner from "./SubLinks/DropDownNavBarInner";
import {useRouter, withRouter} from "next/router";


const NavBar = ()=>{
    const text = 'Հետազոտություններ'
    const dispatch = useDispatch()
    const pages =useSelector(state=>state.navigation)
    const router = useRouter()
    const {locale} = router

    useEffect(()=>{
        dispatch(getNavBarItems())
    }, [])



    return (
        <nav className={NavStyle.NavBarMain}>
            <ul>
                {
                    pages.map((item)=>{
                        console.log(item.dLinks);
                        return(
                            <li key={item.id} className={ item.subLinks ? NavStyle.HasChild : null }>
                                <Link href={item.link ? item.link : ''} as={item.urlMask ? `${item.urlMask}` : ''}>
                                    <a>
                                            {item.title}
                                    </a>
                                </Link>
                                <DropDownNavBarInner subLink={item.subLinks ? item.subLinks : null}/>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}


export default withRouter(NavBar)