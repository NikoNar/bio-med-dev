import React, {useEffect, useState} from 'react';
import MNStyle from './mobile-navbar.module.scss'
import Logo from "../../Logo/Logo";
import AccountIcon from "../../SVGIcons/Account/AccountIcon";
import BagIcon from "../../SVGIcons/Bag/BagIcon";
import BurgerMenu from "../../SVGIcons/BurgerMenu/BurgerMenu";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {getNavBarItems} from "../../../redux/actions/navBarAction";
import CloseIcon from "../../SVGIcons/CloseIcon/CloseIcon";
import {switchMobileNavBarState} from "../../../redux/actions/setNavBarStateAction";
import Search from "../../UserControlComponent/Search/Search";
import LanguageSwitcher from "../../UserControlComponent/LanguageSwitcher/LanguageSwitcher";
import AccountIconComponent from "../../UserControlComponent/AccountIconComponent/AccountIconComponent";
import {getCurrentUserAction} from "../../../redux/actions/getCurrentUserAction";
import UserControlComponent from "../../UserControlComponent/UserControlComponent";

const MobileNavBar = () => {
    const dispatch = useDispatch()
    const pages =useSelector(state=>state.navigation)
    const user = useSelector(state => state.currentUser)
    const orders = useSelector(state=>state.orders)
    const [isOpen, setIsOpen] = useState(false)


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
                    <UserControlComponent user={user} orders={orders}  setIsOpen={setIsOpen}/>
                </div>
                <div className={MNStyle.Links}>
                    <nav>
                        <ul>
                            {
                                pages ? pages.map((p, index)=>{
                                    return <li className={ p.subLinks ? MNStyle.HasChild : null } key={index}>
                                        <Link href={p.link}><a onClick={()=>setIsOpen(false)}>{p.title}</a></Link>
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