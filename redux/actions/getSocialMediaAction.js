import {GET_SOCIAL_MEDIA} from "../types";
import {socialMediaUrl} from "../../utils/url";


export const fetchSocialMedia = ()=>{
    return async (dispatch)=>{
        const social = await fetch(socialMediaUrl)
            .then(res=>res.json())
            .then(data=>data)

        dispatch(getSocialMediaAction(social))
    }
}


const getSocialMediaAction = (social)=>{
    return (
        {
            type: GET_SOCIAL_MEDIA,
            payload: social
        }
    )
}