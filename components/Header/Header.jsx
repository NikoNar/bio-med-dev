import React, {useEffect, useState} from "react";
import NavBar from "../NavBar/NavBar";
import HeaderStyle from './header.module.scss'
import LinkButton from "../LinkButton/LinkButton";
import Logo from "../Logo/Logo";
import {useDispatch, useSelector} from "react-redux";

import {getCurrentUserAction} from "../../redux/actions/getCurrentUserAction";
import MobileNavBar from "../NavBar/MobileNavBar/MobileNavBar";
import {getAllOrdersItem} from "../../redux/actions/setOrderAction";
import useTranslation from "next-translate/useTranslation";
import Search from "../UserControlComponent/Search/Search";
import UserControlComponent from "../UserControlComponent/UserControlComponent";
import {getNavBarItems} from "../../redux/actions/navBarAction";


const Header = ({pageProps, loc}) => {

    const {t} = useTranslation()

    const dispatch = useDispatch()
    const user = useSelector(state => state.currentUser)
    const pages =useSelector(state=>state.navigation)
    const orders = useSelector(state => state.orders)
    const [isOpen, setIsOpen] = useState(false)
    const buttonLink = user ? "/profile" : "/results"

    useEffect(() => {
        dispatch(getCurrentUserAction())
        dispatch(getAllOrdersItem())
        dispatch(getNavBarItems(loc && loc))
    }, [pageProps, loc])


    return (
        <>
            <header className={HeaderStyle.DesktopHeader}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className="col-lg-12">
                            <div className={HeaderStyle.TopHeader}>
                                <LinkButton text={t('common:analyzes_results')} link={buttonLink}/>
                            </div>
                        </div>
                    </div>
                </div>
                <section className={HeaderStyle.MainHeader}>
                    <div className={'container'}>
                        <div className={'row'}>
                            <div className={'col-lg-12'}>
                                <div className={HeaderStyle.MainHeaderWrapper}>
                                    <Logo/>
                                    <div className={HeaderStyle.UserControl}>
                                    <Search setIsOpen={setIsOpen}/>
                                    <UserControlComponent user={user} orders={orders}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'col-lg-12'}>
                                <NavBar loc={loc} pages={pages}/>
                            </div>
                        </div>
                    </div>
                </section>
            </header>
            <MobileNavBar pages={pages}/>
        </>
    )
}


export default Header