import React from 'react';
import HeaderStyle from "../../Header/header.module.scss";
import Link from "next/link";
import BagIcon from "../../SVGIcons/Bag/BagIcon";

const BagIconComponent = ({user, orders}) => {
    return (
        <div className={HeaderStyle.Bag + ' ' + HeaderStyle.Item}>
            <Link href={ !user ? '/account' : '/cart'}>
                <a>
                    <BagIcon/>
                </a>
            </Link>
            <span className={HeaderStyle.BagCount}>{orders && user ? orders.length : 0}</span>
        </div>
    );
};

export default BagIconComponent;