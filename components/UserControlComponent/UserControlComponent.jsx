import React from 'react';
import HeaderStyle from "../Header/header.module.scss";
import AccountIconComponent from "./AccountIconComponent/AccountIconComponent";
import LanguageSwitcher from "./LanguageSwitcher/LanguageSwitcher";
import BagIconComponent from "./BagIconComponent/BagIconComponent";
import Search from "./Search/Search";

const UserControlComponent = ({user, orders, setIsOpen}) => {
    return (
        <div className={HeaderStyle.Search}>
            <div className={HeaderStyle.UserControl}>
                <Search setIsOpen={setIsOpen}/>
                <BagIconComponent orders={orders} user={user}/>
                <AccountIconComponent user={user} callBack={()=>setIsOpen(false)}/>
                <LanguageSwitcher/>
            </div>
        </div>
    );
};

export default UserControlComponent;