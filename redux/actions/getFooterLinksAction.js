import {GET_FOOTER_LINKS_LEFT, GET_FOOTER_LINKS_RIGHT} from "../types";
import {footerLeftLinksUrl, footerRightLinksUrl} from "../../utils/url";


export const getFooterLeftLinks = (locale)=>{
    return async (dispatch)=>{
        const links = await fetch(`${footerLeftLinksUrl}?${locale !== 'hy' ? `lang=${locale}`: ''}`)
            .then(res=>res.json())
            .then(data=>data)


        dispatch(getFooterLinksActionLeft(links))
    }
}


export const getFooterRightLinks = (locale)=>{
    return async (dispatch)=>{
        const links = await fetch(`${footerRightLinksUrl}?${locale !== 'hy' ? `lang=${locale}`: ''}`)
            .then(res=>res.json())
            .then(data=>data)

        dispatch(getFooterLinksActionRight(links))
    }
}




export const getFooterLinksActionLeft = (links)=>{
    return {
        type: GET_FOOTER_LINKS_LEFT,
        payload: links
    }
}


export const getFooterLinksActionRight = (links)=>{
    return {
        type: GET_FOOTER_LINKS_RIGHT,
        payload: links
    }
}
