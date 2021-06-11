import {SET_SELECTED_FILTERS} from "../types";

export const selectedFiltersReducer = (state = null, action)=>{
    switch (action.type) {
        case SET_SELECTED_FILTERS:
            return action.payload
        default:
            return state
    }
}

