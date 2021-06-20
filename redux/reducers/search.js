import {SEARCH} from "../types";

export const searchReducer = (state={}, action)=>{
    switch (action.type) {
        case SEARCH:
            return {...state, results: action.payload, keyWord: action.keyWord}
        default:
            return state
    }
}