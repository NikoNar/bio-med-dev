import React from 'react';

const CloseIcon = ({callBack, color}) => {
    return (
        <div onClick={callBack}>
            <svg width="100%" height="100%" viewBox="0 0 24 24" style={{fill: color}}>
                <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/>
                <path
                    d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/>
            </svg>
        </div>
    );
};

export default CloseIcon;