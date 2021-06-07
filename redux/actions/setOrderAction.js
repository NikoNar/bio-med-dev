import {ADD_ORDER_TO_CART, GET_ALL_ORDER_ITEMS, REMOVE_ALL_ORDERS_FROM_CART} from "../types";
import {destroyCookie, setCookie} from "nookies";


let orders = []

export const getAllOrdersItem = () => {

    const ordersJson = window.localStorage.getItem('orders')
    const orders = JSON.parse(ordersJson)

    return {
        type: GET_ALL_ORDER_ITEMS,
        payload: orders
    }
}


export const addToCartAction = (data) => {

    if(orders.map(o => o.number).indexOf(data.number) === -1)orders.push(data);

    window.localStorage.setItem('orders', JSON.stringify(orders))

    return {
        type: ADD_ORDER_TO_CART,
        payload: orders
    }
}

export const removeAllOrdersAction = () => {
    window.localStorage.removeItem('orders')
    orders=[]
    return {
        type: REMOVE_ALL_ORDERS_FROM_CART,
        payload: orders
    }
}