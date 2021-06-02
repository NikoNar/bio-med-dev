import React from 'react';
import ContStyle from '../contact.module.scss'


const CustomIcon = ({ text }) => {
    return (
        <div className={ContStyle.MapIcon}>
            <svg width="100%" height="100%" viewBox="0 0 12 14" fill="#ff0000" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.70885 0.845978L11.3062 4.01742V10.3618L5.70885 13.5332L0.111542 10.3618V4.01742L5.70885 0.845978Z" fill="#932322"/>
            </svg>
            <p className="pin-text">{text}</p>
        </div>
    );
};

export default CustomIcon;