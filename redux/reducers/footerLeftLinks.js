import {GET_FOOTER_LINKS_LEFT, GET_FOOTER_LINKS_RIGHT} from "../types";

export const footerLeftLinksReducer =  (state=[], action)=>{
    switch (action.type){
        case GET_FOOTER_LINKS_LEFT:
            return action.payload
        default:
            return state
    }
}
