import {combineReducers} from "redux";
import {navBarReducer} from "./navigation";
import {socialMediaReducer} from "./social";
import {newsReducer} from "./news";
import {currentUserReducer} from "./currentUser";
import {addOrderToCartReducer} from "./orders";


export const rootReducer = combineReducers({
    navigation: navBarReducer,
    social: socialMediaReducer,
    news: newsReducer,
    currentUser: currentUserReducer,
    orders: addOrderToCartReducer
})