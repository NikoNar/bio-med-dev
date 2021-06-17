import React, {useEffect} from "react";
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


const Header = ({pageProps}) => {

    const {t} = useTranslation()

    const dispatch = useDispatch()
    const user = useSelector(state => state.currentUser)
    const orders = useSelector(state => state.orders)

    const buttonLink = user ? "/profile" : "/results"

    useEffect(() => {
        dispatch(getCurrentUserAction())
        dispatch(getAllOrdersItem())
    }, [pageProps])


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
                    <div className={HeaderStyle.MainHeaderWrapper}>
                        <Logo/>
                        <UserControlComponent user={user} orders={orders}/>
                    </div>
                    <NavBar/>
                </section>
            </header>
            <MobileNavBar/>
        </>
    )
}


export default Header