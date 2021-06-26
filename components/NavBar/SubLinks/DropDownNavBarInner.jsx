import React from 'react';
import SubLinks from "./SubLinks";
import NavStyle from '../navigation.module.scss'

const DropDownNavBarInner = ({subLink}) => {

    return (
        <>
            {
                subLink && true ?
                    <ul className={NavStyle.Dropdown}>
                        {
                            subLink.map((sl) => {
                                return <SubLinks link={sl} key={sl.ID}/>
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