import React, {useEffect, useState} from 'react';
import MNStyle from './mobile-navbar.module.scss'
import Logo from "../../Logo/Logo";
import BurgerMenu from "../../SVGIcons/BurgerMenu/BurgerMenu";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {getNavBarItems} from "../../../redux/actions/navBarAction";
import CloseIcon from "../../SVGIcons/CloseIcon/CloseIcon";
import {switchMobileNavBarState} from "../../../redux/actions/setNavBarStateAction";
import Search from "../../UserControlComponent/Search/Search";
import {getCurrentUserAction} from "../../../redux/actions/getCurrentUserAction";
import UserControlComponent from "../../UserControlComponent/UserControlComponent";
import {useRouter} from "next/router";

const MobileNavBar = () => {
    const dispatch = useDispatch()
    const pages =useSelector(state=>state.navigation)
    const user = useSelector(state => state.currentUser)
    const orders = useSelector(state=>state.orders)
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()


    useEffect(()=>{
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        dispatch(getNavBarItems())
    }, [isOpen])



    const handleOpen = (state)=>{
        dispatch(switchMobileNavBarState(state))
        dispatch(getCurrentUserAction())
        setIsOpen(!isOpen)
    }

    const closeSideBar = ()=>{
        setTimeout(()=>{
            setIsOpen(false)
        },2000)
    }

    return (
        <header className={MNStyle.Mobile}>
            <div className={MNStyle.Wrapper}>
               <Logo/>
               <div className={MNStyle.Burger}>
                   {
                       isOpen ? <CloseIcon callBack={()=>handleOpen(isOpen)}/> :  <BurgerMenu callBack={()=>handleOpen(isOpen)}/>
                   }
               </div>
            </div>
            <div className={isOpen ? MNStyle.Menu + ' ' + MNStyle.Open : MNStyle.Menu}>
                <div className={MNStyle.ControlWrapper}>
                    <Search setIsOpen={setIsOpen}/>
                    <UserControlComponent user={user} orders={orders}  setIsOpen={()=>setIsOpen(false)}/>
                </div>
                <div className={MNStyle.Links}>
                    <nav>
                        <ul>
                            {
                                pages ? pages.map((p, index)=>{
                                    return <li className={ p.subLinks ? MNStyle.HasChild : null } key={index} onClick={()=>{
                                        closeSideBar()                    
                                    }}>
                                        <Link href={p.link}>
                                            <a>{p.title}</a>
                                        </Link>
                                    </li>
                                }) : ''
                            }
                        </ul>
                    </nav>
                </div>
            </div>

        </header>
    );
};

export default MobileNavBar;