import React from 'react';
import HeaderStyle from "../../Header/header.module.scss";
import Link from "next/link";
import AccountIcon from "../../SVGIcons/Account/AccountIcon";


const AccountIconComponent = ({user, callBack}) => {
    return (
        <div
            onClick={callBack && callBack}
            className={user ? HeaderStyle.Account + ' ' + HeaderStyle.LoggedIn + ' ' + HeaderStyle.Item : HeaderStyle.Account + ' ' + HeaderStyle.Item}
        >
            {
                !user ? <Link href={'/account'}>
                    <a>
                        <AccountIcon/>
                    </a>
                </Link> : <Link href={'/profile'}><a>{user ? user.first_name : '/account'}</a></Link>
            }

        </div>
    );
};

export default AccountIconComponent;
