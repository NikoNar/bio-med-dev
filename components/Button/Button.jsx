import React from "react";
import buttonStyles from './button.module.scss'


const styles = {
    background: 'linear-gradient(208deg,' + 'transparent 11px,' + '#183042 0)'
}


const Button = ({text, backgroundColor, type, callBack, icon, disabled, padding}) => {
    console.log(padding);
    return (
        <>
            <button
                style={{
                    background: backgroundColor ? backgroundColor : styles.background, display: icon ? 'none' : 'inline-block',
                    padding: padding
                }}
                className={buttonStyles.Button}
                type={type}
                onClick={callBack}
                disabled={disabled}
            >{text}
                <span className={buttonStyles.Icon} style={{display: type === 'submit' ? 'none' : 'inline-block'}}>
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
                </span>
            </button>
        </>
    )
}

export default Button