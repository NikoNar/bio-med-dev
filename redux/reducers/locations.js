import {GET_LOCATIONS} from "../types";

export const locationsReducer = (state=[], action)=>{
    switch (action.type) {
        case GET_LOCATIONS:
            return action.payload
        default:
            return state
    }
}