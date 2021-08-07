import React from 'react';
import SpinnerStyles from './Spinner.module.css'

const Spinner = () => {
    return (
        <span className={SpinnerStyles.Wrapper}>
            <svg className="spinner" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
                 preserveAspectRatio="xMidYMid">
                <rect className="spinner__rect" x="0" y="0" width="100" height="100" fill="none"></rect>
                <circle className="spinner__circle" cx="50" cy="50" r="40" stroke="#999999" fill="none" strokeWidth="6"
                        strokeLinecap="round">
                </circle>
            </svg>
        </span>
    );
};

export default Spinner;
