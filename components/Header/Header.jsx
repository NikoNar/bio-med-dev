import React, {useEffect, useState} from "react";
import NavBar from "../NavBar/NavBar";
import HeaderStyle from './header.module.scss'
import LinkButton from "../LinkButton/LinkButton";
import Logo from "../Logo/Logo";
import Link from "next/link";
import SelectBox from "../SelectBox/SelectBox";
import {useDispatch, useSelector} from "react-redux";

import {getCurrentUserAction} from "../../redux/actions/getCurrentUserAction";
import MobileNavBar from "../NavBar/MobileNavBar/MobileNavBar";
import AccountIcon from "../SVGIcons/Account/AccountIcon";
import BagIcon from "../SVGIcons/Bag/BagIcon";
import {getAllOrdersItem} from "../../redux/actions/setOrderAction";
import {useRouter} from "next/router";
import { useCookies } from 'react-cookie';
import useTranslation from "next-translate/useTranslation";



const Header = ({pageProps}) => {

    const {t} = useTranslation()


    const router = useRouter()
    const {locale} = router
    const [ cookie, setCookie ] = useCookies(['NEXT_LOCALE']);

    const dispatch = useDispatch()
    const user = useSelector(state => state.currentUser)
    const orders = useSelector(state=>state.orders)

    const buttonLink = user ? "/profile" : "/results"

    useEffect(()=>{
        dispatch(getCurrentUserAction())
        dispatch(getAllOrdersItem())
    },[pageProps])


    const styles = {
        control: (provided) => ({
            ...provided,
            boxShadow: "none",
            border: "none",
            backgroundColor: "#F5FAFF"
        }),
        container: (provided, state) => ({
            ...provided,
            border: "none",
            boxShadow: "none"
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused && "#F5FAFF",
            color: "#183042",
            fontSize: "16px"
        })
    }


    const LanguageSwitcherOptions = [
        {value: 'hy', label: 'Հայ'},
        {value: 'ru', label: 'Рус'},
        {value: 'en', label: 'Eng'}
    ]
    const [selectedValue, setSelectedValue] = useState(locale);

    const handleChange = (e) => {
        const locale = e.value;
        setSelectedValue(locale);
        router.push(router.asPath,router.asPath, { locale }).then();
        if(cookie.NEXT_LOCALE !== locale){
            setCookie("NEXT_LOCALE", locale);
        }
    }

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
                                    <div className={HeaderStyle.Search}>
                                        <form>
                                            <div className={HeaderStyle.SearchWrapper}>
                                                <input placeholder={t('common:search')} type="text"/>
                                                <button></button>
                                            </div>
                                        </form>
                                        <div className={HeaderStyle.UserControl}>
                                            <div className={HeaderStyle.Bag + ' ' + HeaderStyle.Item}>
                                                <Link href={ !user ? '/account' : '/cart'}>
                                                    <a>
                                                        <BagIcon/>
                                                    </a>
                                                </Link>
                                                <span className={HeaderStyle.BagCount}>{orders && user ? orders.length : 0}</span>
                                            </div>
                                            <div className={user ? HeaderStyle.Account + ' ' + HeaderStyle.LoggedIn + ' ' + HeaderStyle.Item : HeaderStyle.Account + ' ' + HeaderStyle.Item}>
                                                {
                                                    !user ? <Link href={'/account'}>
                                                        <a>
                                                            <AccountIcon/>
                                                        </a>
                                                    </Link> : <Link href={'/profile'}><a>{user.fullName}</a></Link>
                                                }

                                            </div>
                                            <div className={HeaderStyle.LanguageSwitcher + ' ' + HeaderStyle.Item}>
                                                <SelectBox
                                                    options={LanguageSwitcherOptions}
                                                    value={LanguageSwitcherOptions.find(obj => obj.value === selectedValue)}
                                                    defaultValue={locale}
                                                    id={1}
                                                    inputId={'header'}
                                                    components={{
                                                        IndicatorSeparator: () => null,
                                                    }}
                                                    styles={styles}
                                                    isSearchable={false}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'col-lg-12'}>
                                <NavBar/>
                            </div>
                        </div>
                    </div>
                </section>
            </header>
            <MobileNavBar/>
        </>
    )
}





export default Header