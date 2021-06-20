import {SET_NAVBAR_CLOSE, SET_NAVBAR_OPEN} from "../types";

export const mobileNavbarReducer = (state = false, action)=>{
    switch (action.type) {
        case SET_NAVBAR_OPEN:
            return action.payload
        case SET_NAVBAR_CLOSE:
            return action.payload
        default:
            return state
    }
}