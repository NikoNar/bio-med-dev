import {GET_CURRENT_USER} from "../types";
import {parseCookies} from "nookies";




export const getCurrentUserAction = () => {
    const cookieUser = parseCookies('currentUser')

    const user = cookieUser.currentUser ? JSON.parse(cookieUser.currentUser) : null
    return {
        type: GET_CURRENT_USER,
        payload: user
    }
}