import {GET_SOCIAL_MEDIA} from "../types";

export const socialMediaReducer = (state = [], action)=>{
    switch (action.type) {
        case GET_SOCIAL_MEDIA:
            return action.payload
        default:
            return state
    }
}