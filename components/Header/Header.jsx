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



const linkText = globalLinkText

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
        <header className={HeaderStyle.DesktopHeader}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className="col-lg-12">
                        <div className={HeaderStyle.TopHeader}>
                            <LinkButton text={linkText}/>
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
                                                    <svg version="1.1" viewBox="0 0 36 30">
                                                        <path className="st0" d="M34.8,10.3c-0.4-0.5-1-0.8-1.6-0.8H26l-3.8-8.7c-0.1-0.3-0.5-0.5-0.9-0.3C21,0.6,20.8,1,21,1.3l3.6,8.2H11
                                                	l3.6-8.2c0.1-0.3,0-0.7-0.3-0.9c-0.3-0.1-0.7,0-0.9,0.3L9.6,9.5H2.5c-0.6,0-1.2,0.3-1.6,0.8c-0.4,0.5-0.5,1.1-0.4,1.7l3.7,16
                                                	c0.2,0.9,1.1,1.6,2,1.6h23.4c1,0,1.8-0.7,2-1.6l3.7-16C35.3,11.4,35.2,10.8,34.8,10.3L34.8,10.3z M30.2,27.7
                                                	c-0.1,0.3-0.4,0.6-0.7,0.6H6.1c-0.4,0-0.7-0.2-0.7-0.6l-3.7-16c0-0.2,0-0.4,0.1-0.6C2,11,2.2,10.9,2.5,10.9H9L8.5,12
                                                	c-0.1,0.2-0.1,0.3,0,0.5c0.1,0.2,0.2,0.3,0.4,0.4c0.3,0.1,0.7,0,0.9-0.3l0.7-1.7h14.7l0.7,1.7c0.1,0.3,0.6,0.5,0.9,0.3
                                                	c0.2-0.1,0.3-0.2,0.4-0.4c0.1-0.2,0.1-0.3,0-0.5l-0.5-1.2h6.5c0.2,0,0.4,0.1,0.6,0.3c0.1,0.2,0.2,0.4,0.1,0.6L30.2,27.7z"/>
                                                        <path className="st0" d="M11.5,16.1c-0.4,0-0.7,0.3-0.7,0.7v7.6c0,0.4,0.3,0.7,0.7,0.7s0.7-0.3,0.7-0.7v-7.6
                                                	C12.2,16.4,11.9,16.1,11.5,16.1z"/>
                                                        <path className="st0" d="M17.8,16.1c-0.4,0-0.7,0.3-0.7,0.7v7.6c0,0.4,0.3,0.7,0.7,0.7s0.7-0.3,0.7-0.7v-7.6
                                                	C18.5,16.4,18.2,16.1,17.8,16.1z"/>
                                                        <path className="st0" d="M24.1,16.1c-0.4,0-0.7,0.3-0.7,0.7v7.6c0,0.4,0.3,0.7,0.7,0.7c0.4,0,0.7-0.3,0.7-0.7v-7.6
                                            	C24.7,16.4,24.4,16.1,24.1,16.1z"/>
                                                    </svg>
                                                </a>
                                            </Link>
                                            <span className={HeaderStyle.BagCount}>1</span>
                                        </div>
                                        <div className={HeaderStyle.Account + ' ' + HeaderStyle.Item}>
                                            {
                                                !user ? <Link href={'/account'}>
                                                    <a>
                                                        <svg fill="none" viewBox="0 0 26 30"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <g>
                                                                <path
                                                                    d="M12.9274 14.451C14.9126 14.451 16.6317 13.7391 18.0368 12.334C19.4413 10.9295 20.1532 9.21094 20.1532 7.2252C20.1532 5.24004 19.4413 3.52148 18.0362 2.11641C16.6317 0.711914 14.9126 0 12.9274 0C10.9417 0 9.22315 0.711914 7.81865 2.11641C6.41416 3.5209 5.70166 5.24004 5.70166 7.2252C5.70166 9.21094 6.41416 10.9295 7.81865 12.3346C9.22373 13.7391 10.9429 14.451 12.9274 14.451ZM9.06201 3.35977C10.1396 2.28223 11.404 1.75781 12.9274 1.75781C14.4509 1.75781 15.7153 2.28164 16.7935 3.35977C17.871 4.43789 18.3954 5.70234 18.3954 7.2252C18.3954 8.74863 17.871 10.0131 16.7935 11.0912C15.7153 12.1693 14.4509 12.6932 12.9274 12.6932C11.4046 12.6932 10.1401 12.1688 9.06201 11.0912C7.98389 10.0137 7.46006 8.74863 7.46006 7.2252C7.46006 5.70234 7.98389 4.43789 9.06201 3.35977Z"
                                                                    fill="#183042"/>
                                                                <path
                                                                    d="M25.5709 23.0684C25.5304 22.4836 25.4484 21.8461 25.3277 21.1729C25.2058 20.4943 25.0494 19.8533 24.8613 19.2668C24.6673 18.6609 24.4037 18.0627 24.0773 17.4891C23.7392 16.8938 23.3419 16.3758 22.896 15.9492C22.4296 15.5033 21.8589 15.1447 21.1992 14.8828C20.5412 14.6227 19.8123 14.4908 19.0324 14.4908C18.7259 14.4908 18.43 14.6162 17.8582 14.9889C17.506 15.2186 17.0941 15.484 16.6347 15.7775C16.2416 16.0277 15.7095 16.2627 15.0515 16.4748C14.4099 16.6822 13.7584 16.7877 13.1156 16.7877C12.4728 16.7877 11.8212 16.6822 11.1796 16.4748C10.5228 16.2627 9.99019 16.0283 9.59761 15.7775C9.14233 15.4869 8.73042 15.2209 8.373 14.9883C7.80171 14.6156 7.50523 14.4902 7.19878 14.4902C6.4189 14.4902 5.68999 14.6221 5.03257 14.8828C4.3728 15.1441 3.8021 15.5027 3.33511 15.9492C2.88921 16.3758 2.49194 16.8937 2.15386 17.4885C1.82808 18.0621 1.5644 18.6598 1.37046 19.2662C1.18296 19.8521 1.02593 20.4937 0.904639 21.1717C0.783936 21.8443 0.701904 22.4818 0.661475 23.0678C0.622217 23.642 0.602295 24.2385 0.602295 24.8408C0.602295 26.407 1.10034 27.6744 2.08179 28.6096C3.05151 29.5324 4.33413 30 5.89448 30H20.3396C21.8994 30 23.182 29.5324 24.1517 28.6096C25.1337 27.675 25.6312 26.407 25.6312 24.8408C25.6312 24.2361 25.6107 23.6396 25.5709 23.0684ZM22.9394 27.3357C22.299 27.9457 21.4482 28.2422 20.339 28.2422H5.89448C4.7853 28.2422 3.93452 27.9457 3.29409 27.3363C2.66538 26.7381 2.36011 25.9213 2.36011 24.8408C2.36011 24.2789 2.37886 23.7234 2.41577 23.1908C2.4521 22.6682 2.52593 22.0939 2.6355 21.4834C2.7439 20.8805 2.88159 20.315 3.04565 19.8029C3.20269 19.3119 3.41714 18.8256 3.68315 18.3574C3.93687 17.9109 4.22925 17.5283 4.55151 17.2195C4.85269 16.9307 5.23296 16.6945 5.68062 16.5176C6.09487 16.3535 6.56011 16.2639 7.06519 16.2504C7.12671 16.2832 7.23628 16.3453 7.41382 16.4613C7.77534 16.6969 8.19194 16.9658 8.65249 17.2594C9.17163 17.5904 9.84019 17.8893 10.6394 18.1471C11.4562 18.4113 12.2894 18.5455 13.1162 18.5455C13.9429 18.5455 14.7767 18.4113 15.5929 18.1477C16.3927 17.8893 17.0613 17.5904 17.581 17.2594C18.0521 16.9582 18.457 16.6975 18.8185 16.4613C18.996 16.3459 19.1056 16.2832 19.1671 16.2504C19.6722 16.2639 20.138 16.3535 20.5523 16.5176C21 16.6945 21.3796 16.9312 21.6814 17.2195C22.0037 17.5277 22.2955 17.9109 22.5498 18.3574C22.8158 18.8256 23.0308 19.3119 23.1878 19.8023C23.3519 20.315 23.4902 20.8805 23.598 21.4828C23.7076 22.0939 23.7814 22.6687 23.8177 23.1902V23.1908C23.8552 23.7217 23.874 24.2766 23.874 24.8402C23.8734 25.9219 23.5681 26.7381 22.9394 27.3357Z"
                                                                    fill="#183042"/>
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0">
                                                                    <rect fill="white" height="30"
                                                                          transform="translate(0.602295)" width="25.0289"/>
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
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
    )
}





export default Header