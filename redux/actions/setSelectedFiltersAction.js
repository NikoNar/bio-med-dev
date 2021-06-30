import {SET_SELECTED_FILTERS} from "../types";
import {analyzesCategoryUrl, analyzesUrl} from "../../utils/url";


/*export const filterAnalyzesByCategory = (filterValue, mainCategory)=>{
    return async (dispatch)=>{
        const filters = await fetch(`${analyzesUrl}` + '?' + `typeId=${filterValue}`)
            .then(res=>res.json())
            .then(data=>data)

        await dispatch(setSelectedFiltersAction(filters))
    }
}*/

/*export const filterAnalyzesByEvents = (filterValue, mainCategory)=>{
    console.log(mainCategory);
    return async (dispatch)=>{
        const filters = await fetch(`${analyzesUrl}` + '?' + `eventType=${filterValue}`+ `&mainCategory=${mainCategory}`)
            .then(res=>res.json())
            .then(data=>data)

        await dispatch(setSelectedFiltersAction(filters))
    }
}*/

/*
export function setInitialState (loc, activeTab){
   return async (dispatch)=>{
       const currentCategoryTests = await fetch(analyzesUrl +
           `?lang=${loc}` +
           `&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`+
           `&category=${activeTab && activeTab}`)
           .then(res=>res.json())
           .then(data=>data)

       dispatch(setSelectedFiltersAction(currentCategoryTests))
   }
}





export const setSelectedFiltersAction = (filters) => {

    return {
        type: SET_SELECTED_FILTERS,
        payload: filters
    }
}*/
