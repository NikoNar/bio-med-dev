import {GET_SOCIAL_MEDIA} from "../types";

export const socialMediaReducer = (state = null, action)=>{
    switch (action.type) {
        case GET_SOCIAL_MEDIA:
            return action.payload
        default:
            return state
    }
}