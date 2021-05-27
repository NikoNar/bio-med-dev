import {combineReducers} from "redux";
import {navBarReducer} from "./navigation";


export const rootReducer = combineReducers({
    navigation: navBarReducer
})