import {SET_NAVBAR_CLOSE, SET_NAVBAR_OPEN} from "../types";


export const switchMobileNavBarState = (state)=>{

    return (dispatch)=>{
        state ? dispatch(setNavBarCloseAction(state)) : dispatch(setNavBarOpenAction(state))
    }
}





const setNavBarOpenAction = (state)=>{

    const body = document.querySelector('body')
    body.classList.add('open')

    return {
        type: SET_NAVBAR_OPEN,
        payload: state
    }
}


const setNavBarCloseAction = (state)=>{
    const body = document.querySelector('body')
    body.classList.remove('open')

    return {
        type: SET_NAVBAR_CLOSE,
        payload: state
    }
}