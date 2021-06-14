import {SEARCH} from "../types";

export const searchReducer = (state=null, action)=>{
    switch (action.type) {
        case SEARCH:
            return action.payload
        default:
            return state
    }
}