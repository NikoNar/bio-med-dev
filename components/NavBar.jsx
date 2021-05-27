import React from "react";
import Link from "next/link";


const NavBar = ({navigationItems})=>{

    return (
        <>
            <ul>
                {
                    navigationItems.map((item)=>{
                        return(
                            <li key={item.id}>
                                <Link href={item.link}><a>{item.title}</a></Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}


export default NavBar