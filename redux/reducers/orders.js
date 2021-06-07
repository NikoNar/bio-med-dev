import {ADD_ORDER_TO_CART, GET_ALL_ORDER_ITEMS, REMOVE_ALL_ORDERS_FROM_CART} from "../types";

export const addOrderToCartReducer = (state=[], action)=>{

    switch (action.type) {
        case ADD_ORDER_TO_CART:
            return action.payload
        case REMOVE_ALL_ORDERS_FROM_CART:
            return action.payload
        case GET_ALL_ORDER_ITEMS:
            return action.payload
        default:
            return state
    }
}