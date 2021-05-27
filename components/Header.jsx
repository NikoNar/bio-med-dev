import React from "react";
import NavBar from "./NavBar";



const Header = ({navigationItems})=>{

    return (
        <div className={'container'}>
           <NavBar navigationItems={navigationItems}/>
        </div>
    )
}


export default Header