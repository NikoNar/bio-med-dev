import {GET_LOCATIONS} from "../types";
import {locationsUrl} from "../../utils/url";



export const getLocation = ()=>{
    return async (dispatch)=>{
        const locations = await fetch(locationsUrl)
            .then(res=>res.json())
            .then(data=>data)

        dispatch(getLocationsAction(locations))
    }
}



const getLocationsAction = (location)=>{
    return {
        type: GET_LOCATIONS,
        payload: location
    }
}