import {SEARCH} from "../types";
import {analyzesUrl} from "../../utils/url";

let searchResults = []

export const makeSearch = (data, loc)=>{
    console.log(loc);
    return async (dispatch)=>{
        const results = await fetch(analyzesUrl  + `?${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&lang=${loc}`)
            .then(res=>res.json())
            .then(data=>data)
        console.log(results);
        searchResults = [
            ...results.filter((item)=>item.name.toLowerCase().includes(data.toLowerCase())),
            ...results.filter((item)=>item.description.toLowerCase().includes(data.toLowerCase())),
            ...results.filter((item)=>item.slug.toLowerCase().includes(data.toLowerCase()))
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
