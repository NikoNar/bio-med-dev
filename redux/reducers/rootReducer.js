import {combineReducers} from "redux";
import {navBarReducer} from "./navigation";
import {socialMediaReducer} from "./social";


export const rootReducer = combineReducers({
    navigation: navBarReducer,
    social: socialMediaReducer
})