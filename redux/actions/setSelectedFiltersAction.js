import {SET_SELECTED_FILTERS} from "../types";

let filters = []

export const setSelectedFiltersAction = (filterValue, status) => {

    if (status) {
        filters.push(filterValue)
    }
    if (!status) {
        const index = filters.findIndex(f => f === filterValue)
        filters.splice(index, 1)
    }


    return {
        type: SET_SELECTED_FILTERS,
        payload: filters
    }
}