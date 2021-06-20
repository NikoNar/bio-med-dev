import {GET_CONTACT_INFO} from "../types";

export const contactInfoReducer = (state=[], action)=>{
    switch (action.type) {
        case GET_CONTACT_INFO:
            return action.payload
        default:
            return state
    }
}