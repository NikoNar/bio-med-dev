import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {getNavBarItems} from "../../redux/actions/navBarAction";
import NavStyle from './navigation.module.scss'
import DropDownNavBarInner from "./SubLinks/DropDownNavBarInner";
import { withRouter } from "next/router";


const NavBar = ()=>{
    const text = 'Հետազոտություններ'
    const dispatch = useDispatch()
    const pages =useSelector(state=>state.navigation)


    useEffect(()=>{
        dispatch(getNavBarItems())
    }, [])



    return (
        <nav className={NavStyle.NavBarMain}>
            <ul>
                {
                    pages.map((item)=>{
                        return(
                            <li key={item.id} className={ item.subLinks ? NavStyle.HasChild : null }>
                                <Link href={item.link ? item.link : ''}>
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