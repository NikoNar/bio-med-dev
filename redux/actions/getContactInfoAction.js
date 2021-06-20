import {GET_CONTACT_INFO} from "../types";
import {contactInfoUrl} from "../../utils/url";

export const getContactInfo = ()=>{
    return async (dispatch)=>{
        const contactInfo = await fetch(contactInfoUrl)
            .then(res=>res.json())
            .then(data=>data)

        dispatch(getContactInfoAction(contactInfo))
    }
}





export const getContactInfoAction = (contacts)=>{
    return {
        type: GET_CONTACT_INFO,
        payload: contacts
    }
}