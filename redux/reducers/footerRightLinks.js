import {GET_FOOTER_LINKS_RIGHT} from "../types";

export const footerRightLinksReducer =  (state=[], action)=>{
    switch (action.type){
        case GET_FOOTER_LINKS_RIGHT:
            return action.payload
        default:
            return state
    }
}
