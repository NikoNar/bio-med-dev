import React, {useEffect, useState} from 'react';
import MNStyle from './mobile-navbar.module.scss'
import Logo from "../../Logo/Logo";
import SelectBox from "../../SelectBox/SelectBox";
import AccountIcon from "../../SVGIcons/Account/AccountIcon";
import BagIcon from "../../SVGIcons/Bag/BagIcon";
import BurgerMenu from "../../SVGIcons/BurgerMenu/BurgerMenu";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {getNavBarItems} from "../../../redux/actions/navBarAction";
import CloseIcon from "../../SVGIcons/CloseIcon/CloseIcon";

const MobileNavBar = () => {
    const dispatch = useDispatch()
    const pages =useSelector(state=>state.navigation)

    const [isOpen, setIsOpen] = useState(false)

    useEffect(()=>{
        dispatch(getNavBarItems())
    }, [])



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
            boxShadow: "none",
            width: '80px'
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


    const handleOpen = ()=>{
        setIsOpen(!isOpen)
    }
    const handleChange = e => {
        setSelectedValue(e.value);
    }

    return (
        <header className={MNStyle.Mobile}>
            <div className={MNStyle.Wrapper}>
               <Logo/>
               <div className={MNStyle.Burger}>
                   {
                       isOpen ? <CloseIcon callBack={handleOpen}/> :  <BurgerMenu callBack={handleOpen}/>
                   }
               </div>
            </div>
            <div className={isOpen ? MNStyle.Menu + ' ' + MNStyle.Open : MNStyle.Menu}>
                <div className={MNStyle.ControlWrapper}>
                    <div className={MNStyle.Control}>
                        <div className={MNStyle.Bag + ' ' + MNStyle.Item}>
                            <Link href={'cart'}>
                                <a><BagIcon/></a>
                            </Link>
                            <span className={MNStyle.Count}>0</span>
                        </div>
                        <div className={MNStyle.Account + ' ' + MNStyle.Item}>
                            <Link href={'account'}>
                                <a><AccountIcon/></a>
                            </Link>
                        </div>
                        <div className={MNStyle.LanguageSwitcher + ' ' + MNStyle.Item}>
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
                    <form>
                        <div className={MNStyle.SearchWrapper}>
                            <input placeholder="Search..." type="text"/>
                            <button></button>
                        </div>
                    </form>
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