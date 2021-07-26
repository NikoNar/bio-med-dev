import {combineReducers} from "redux";
import {navBarReducer} from "./navigation";
import {newsReducer} from "./news";
import {currentUserReducer} from "./currentUser";
import {addOrderToCartReducer} from "./orders";
import {locationsReducer} from "./locations";
import {selectedFiltersReducer} from "./filters";
import {mobileNavbarReducer} from "./mobileNavbar";
import {searchReducer} from "./search";
import {footerLeftLinksReducer} from "./footerLeftLinks";
import {footerRightLinksReducer} from "./footerRightLinks";


export const allReducers = combineReducers({
    navigation: navBarReducer,
    news: newsReducer,
    currentUser: currentUserReducer,
    orders: addOrderToCartReducer,
    locations: locationsReducer,
    filters: selectedFiltersReducer,
    mobileNavBar: mobileNavbarReducer,
    search: searchReducer,
    footerLeftLinks: footerLeftLinksReducer,
    footerRightLinks: footerRightLinksReducer
})

