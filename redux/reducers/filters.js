import {GET_ALL_ANALYZES_CATEGORIES, SET_SELECTED_FILTERS} from "../types";




export const selectedFiltersReducer = (state = null, action)=>{
    switch (action.type) {
        case SET_SELECTED_FILTERS:
            return action.payload
        case GET_ALL_ANALYZES_CATEGORIES:
            return action.payload
        default:
            return state
    }
}

