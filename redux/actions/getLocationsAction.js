import {GET_LOCATIONS} from "../types";
import {locationsUrl} from "../../utils/url";



export const getLocation = (loc)=>{
    return async (dispatch)=>{
        const locations = await fetch(`${locationsUrl}?status=publish&${loc !== 'hy' ? `lang=${loc}`: ''}`)
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
