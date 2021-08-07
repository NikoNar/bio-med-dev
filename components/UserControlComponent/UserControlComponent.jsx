import React from 'react';
import HeaderStyle from "../Header/header.module.scss";
import AccountIconComponent from "./AccountIconComponent/AccountIconComponent";
import LanguageSwitcher from "./LanguageSwitcher/LanguageSwitcher";
import BagIconComponent from "./BagIconComponent/BagIconComponent";


const UserControlComponent = ({user, orders, setIsOpen, pageProps}) => {
    return (
        <div className={HeaderStyle.Search}>
            <div className={HeaderStyle.UserControl}>
                <BagIconComponent orders={orders} user={user} callBack={setIsOpen}/>
                <LanguageSwitcher/>
                <AccountIconComponent user={user} callBack={setIsOpen}/>
            </div>
        </div>
    );
};

export default UserControlComponent;
