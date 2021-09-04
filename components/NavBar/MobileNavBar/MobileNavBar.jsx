import React, {useEffect, useState} from 'react';
import MNStyle from './mobile-navbar.module.scss'
import Logo from "../../Logo/Logo";
import BurgerMenu from "../../SVGIcons/BurgerMenu/BurgerMenu";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import CloseIcon from "../../SVGIcons/CloseIcon/CloseIcon";
import {switchMobileNavBarState} from "../../../redux/actions/setNavBarStateAction";
import Search from "../../UserControlComponent/Search/Search";
import UserControlComponent from "../../UserControlComponent/UserControlComponent";
import NavStyle from "../navigation.module.scss";
import DropDownNavBarInner from "../SubLinks/DropDownNavBarInner";
import {useRouter} from "next/router";
import LinkButton from "../../LinkButton/LinkButton";
import useTranslation from "next-translate/useTranslation";


const MobileNavBar = ({pages, loc}) => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const user = useSelector(state => state.currentUser)
    const orders = useSelector(state=>state.orders)
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const [subNavOpen, setSubNavOpen] = useState(false)

    const openSubNavBar = (e)=>{
        e.stopPropagation()
        setSubNavOpen(!subNavOpen)
        console.log('Boom')
    }
    useEffect(()=>{
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen])
    const handleOpen = (state)=>{
        dispatch(switchMobileNavBarState(state))
        setIsOpen(!isOpen)
    }
    const closeSideBar = ()=>{
        setTimeout(()=>{
            setIsOpen(false)
        },3000)
    }


    return (
        <div className={MNStyle.Mobile}>
            <div className={MNStyle.ResButton} onClick={()=>closeSideBar()}>
                <LinkButton text={t('common:analyzes_results')} link={'/results'}/>
            </div>
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
                    <Search setIsOpen={setIsOpen} loc={loc}/>
                    <UserControlComponent user={user} orders={orders}  setIsOpen={()=>setIsOpen(false)}/>
                </div>
                <div className={MNStyle.Links}>
                    <nav>
                        <ul>
                            {
                                pages.items && pages.items.map((item)=>{
                                    return(
                                        <li key={item.ID} className={ item.child_items && subNavOpen ? MNStyle.HasChild + ' ' + MNStyle.Open : item.child_items && !subNavOpen ? MNStyle.HasChild : null} onClick={()=>closeSideBar()}>
                                            {item.child_items ? <span className={'_icon-chevrone-down'} onClick={(e)=>openSubNavBar(e)}></span> : null}
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
                </div>
            </div>
        </div>
    );
};

export default MobileNavBar;
