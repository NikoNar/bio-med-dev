import {CREATE_NAV_BAR} from "../types";
import {navigationUrl} from "../../utils/url";



export function getNavBarItems(locale) {

    return async (dispatch)=>{
        const navBarItems = await fetch(`${process.env.NEXT_PUBLIC_HOST_MENU}/main-menu?lang=${locale}`,{
            method: 'GET',
            mode: 'no-cors'
        })
            .then(res=>res.json())
            .then(items=>items)
            .catch((error)=>{
                console.log(error)
            })
        dispatch(navBarAction(navBarItems))
    }
}

export const navBarAction = (items)=>{
    return {
        type: CREATE_NAV_BAR,
        payload: items
    }
}
