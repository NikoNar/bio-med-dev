import React, {useEffect, useState} from "react";
import NavBar from "../NavBar/NavBar";
import HeaderStyle from './header.module.scss'
import LinkButton from "../LinkButton/LinkButton";
import Logo from "../Logo/Logo";
import Link from "next/link";
import SelectBox from "../SelectBox/SelectBox";
import {globalLinkText} from "../../utils/linkTexts";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserAction} from "../../redux/actions/getCurrentUserAction";
import MobileNavBar from "../NavBar/MobileNavBar/MobileNavBar";
import AccountIcon from "../SVGIcons/Account/AccountIcon";
import BagIcon from "../SVGIcons/Bag/BagIcon";



const linkText = globalLinkText
const buttonLink = "/profile"

const Header = (pageProps) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.currentUser)


    useEffect(()=>{
        dispatch(getCurrentUserAction())
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
    const [selectedValue, setSelectedValue] = useState(LanguageSwitcherOptions[0].value);

    const handleChange = e => {
        setSelectedValue(e.value);
    }

    return (
        <>
            <header className={HeaderStyle.DesktopHeader}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className="col-lg-12">
                            <div className={HeaderStyle.TopHeader}>
                                <LinkButton text={linkText} href={buttonLink}/>
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
                                                <input placeholder="Search..." type="text"/>
                                                <button></button>
                                            </div>
                                        </form>
                                        <div className={HeaderStyle.UserControl}>
                                            <div className={HeaderStyle.Bag + ' ' + HeaderStyle.Item}>
                                                <Link href={'/cart'}>
                                                    <a>
                                                        <BagIcon/>
                                                    </a>
                                                </Link>
                                                <span className={HeaderStyle.BagCount}>1</span>
                                            </div>
                                            <div className={HeaderStyle.Account + ' ' + HeaderStyle.Item}>
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
                                                    defaultValue={LanguageSwitcherOptions[0]}
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