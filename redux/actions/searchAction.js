import {SEARCH} from "../types";
import {analyzesUrl} from "../../utils/url";

let searchResults = []

export const makeSearch = (data)=>{

    return async (dispatch)=>{
        const results = await fetch(analyzesUrl)
            .then(res=>res.json())
            .then(data=>data)
        searchResults = [
            ...results.filter((item)=>item.title.toLowerCase().includes(data.toLowerCase())),
            ...results.filter((item)=>item.body.toLowerCase().includes(data.toLowerCase()))
        ]

        dispatch(searchAction(searchResults, data))
    }
}

const searchAction = (results, keyWord)=>{
    return {
        type: SEARCH,
        payload: results,
        keyWord: keyWord
    }
}