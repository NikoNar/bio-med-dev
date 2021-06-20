import {GET_CURRENT_USER} from "../types";

export function currentUserReducer(state = null, action) {
    switch (action.type) {
        case GET_CURRENT_USER:
            return action.payload
        default:
            return state
    }
}