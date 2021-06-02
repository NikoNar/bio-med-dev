import {ADD_ORDER_TO_CART} from "../types";

export const addOrderToCartReducer = (state=[], action)=>{
    switch (action.payload) {
        case ADD_ORDER_TO_CART:
            return action.payload
        default:
            return state
    }
}