import {ADD_ORDER_TO_CART, GET_ALL_ORDER_ITEMS, REMOVE_ALL_ORDERS_FROM_CART, REMOVE_ITEM_FROM_CART} from "../types";

let ordersInitialArray = []

export const getAllOrdersItem = () => {
    const json = window.localStorage.getItem('orders')
    const orders = JSON.parse(json)

    return {
        type: GET_ALL_ORDER_ITEMS,
        payload: orders
    }
}


export const addItemToCart = (data) => {

    window.localStorage.setItem('orders', JSON.stringify(ordersInitialArray))
    if (ordersInitialArray.map(o => o.number).indexOf(data.number) === -1) ordersInitialArray = [...ordersInitialArray, data];
    window.localStorage.setItem('orders', JSON.stringify(ordersInitialArray))
    return {
        type: ADD_ORDER_TO_CART,
        payload: ordersInitialArray
    }

}


export const removeAllOrdersAction = () => {
    window.localStorage.removeItem('orders')
    ordersInitialArray = []

    return {
        type: REMOVE_ALL_ORDERS_FROM_CART,
        payload: ordersInitialArray
    }
}


export const removeCartItem = (index) => {

    ordersInitialArray = ordersInitialArray.filter((data, idx) => idx !== index )
    window.localStorage.setItem('orders', JSON.stringify(ordersInitialArray))

    return {
        type: REMOVE_ITEM_FROM_CART,
        payload: ordersInitialArray
    }
}