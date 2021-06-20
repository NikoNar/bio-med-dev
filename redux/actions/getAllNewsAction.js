import {GET_ALL_NEWS} from "../types";
import {newsUrl} from "../../utils/url";


export const getAllNews = ()=>{
    return async (dispatch)=>{

        const news = await fetch(newsUrl)
            .then(res => res.json())
            .then(data => data)

        dispatch(getAllNewsAction(news))
    }
}





export const getAllNewsAction = (news)=>{
    return {
        type: GET_ALL_NEWS,
        payload: news
    }
}