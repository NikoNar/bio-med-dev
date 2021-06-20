import React from 'react';
import SubLinks from "./SubLinks";
import NavStyle from '../navigation.module.scss'

const DropDownNavBarInner = ({subLink}) => {

    return (
        <>
            {
                subLink ?
                    <ul className={NavStyle.Dropdown}>
                        {
                            subLink.map((sl) => {
                                    return <SubLinks link={sl} key={sl.id}/>
                                }
                            )
                        }
                    </ul>
                    : ''
            }
        </>
    );
};

export default DropDownNavBarInner;