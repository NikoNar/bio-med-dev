import {GET_ALL_NEWS} from "../types";

export const newsReducer = (state=[], action)=>{
    switch (action.type) {
        case GET_ALL_NEWS:
            return action.payload
        default:
            return state
    }
}