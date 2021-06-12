import {SET_SELECTED_FILTERS} from "../types";
import {analyzesCategoryUrl, analyzesUrl} from "../../utils/url";


export const filterAnalyzesByCategory = (filterValue)=>{

    return async (dispatch)=>{
        const filters = await fetch(`${analyzesUrl}` + '?' + `typeId=${filterValue}`)
            .then(res=>res.json())
            .then(data=>data)

        await dispatch(setSelectedFiltersAction(filters))
    }
}

export const filterAnalyzesByEvents = (filterValue)=>{
    return async (dispatch)=>{
        const filters = await fetch(`${analyzesUrl}` + '?' + `eventType=${filterValue}`)
            .then(res=>res.json())
            .then(data=>data)

        await dispatch(setSelectedFiltersAction(filters))
    }
}

export const getCategories = ()=>{
    return async (dispatch)=>{

        const categories = await fetch(analyzesCategoryUrl)
            .then(res=>res.json())
            .then(data=>data)


        dispatch(setSelectedFiltersAction(categories))
    }
}





export const setSelectedFiltersAction = (filters) => {

    return {
        type: SET_SELECTED_FILTERS,
        payload: filters
    }
}