import {ADD_ORDER_TO_CART} from "../types";
import {orderUrl} from "../../utils/url";

export const addOrder = (data)=>{
    console.log(data);
    return async (dispatch)=>{
        const order = await fetch(orderUrl, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
            })

        dispatch(setOrderAction(order))
    }
}




export const setOrderAction = ()=>{
    return {
        type: ADD_ORDER_TO_CART
    }
}