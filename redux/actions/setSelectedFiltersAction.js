import {SET_SELECTED_FILTERS} from "../types";
import {analyzesUrl} from "../../utils/url";

export const filterAnalyzesByCategory = (filterValue)=>{

    return async (dispatch)=>{
        const filters = await fetch(`${analyzesUrl}` + '?' + `typeId=${filterValue}`)
            .then(res=>res.json())
            .then(data=>data)

        await dispatch(setSelectedFiltersAction(filters))
    }
}

export const filterAnalyzesByEvents = (filterValue)=>{
    console.log(filterValue);
    return async (dispatch)=>{
        const filters = await fetch(`${analyzesUrl}` + '?' + `eventType=${filterValue}`)
            .then(res=>res.json())
            .then(data=>data)

        await dispatch(setSelectedFiltersAction(filters))
    }
}


export const setSelectedFiltersAction = (filters) => {

    return {
        type: SET_SELECTED_FILTERS,
        payload: filters
    }
}