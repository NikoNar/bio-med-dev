import {SEARCH} from "../types";
import {searchUrl} from "../../utils/url";


export const getSearchResults = (loc, data, page)=>{
    return async (dispatch)=>{
        if(data !== ''){
            const searchRes = await fetch(`${searchUrl}&lang=${loc}&search=${data}&page=${page}`, {
                method: 'GET'
            })
                .then(res=> {
                    const totalSearchResults = res.headers.get('x-wp-total')
                    const totalPages = res.headers.get('x-wp-totalpages')
                    const results = JSON.stringify(totalSearchResults)
                    const pages = JSON.stringify(totalPages)
                    const word = JSON.stringify(data)
                    localStorage.setItem('searchKeyWord', word)
                    localStorage.setItem('resultsCount', results)
                    localStorage.setItem('pagesCount', pages)
                    localStorage.setItem('searchKeyWord', word)
                    return res.json()
                })
                .then(data=>data)
            dispatch(searchAction(searchRes))
        }else{
            dispatch(searchAction(null))
        }
        data = ''
    }
}




export const searchAction = (data)=>{
    return {
        type: SEARCH,
        payload: data
    }
}
