import {CREATE_NAV_BAR} from "../types";


export function getNavBarItems() {
    return async (dispatch)=>{

        const navBarItems = await fetch('/store.json')
            .then(res=>res.json())
            .then(items=>items.pages)
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