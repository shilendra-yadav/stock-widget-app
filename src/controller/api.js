import { get } from "../utils/http"
import { API, constants } from "../utils/contants"

/**
 * Returns list of stocks based on symbol  
 * @exports
 * @param {string} query // symbol
 * @returns {Promise} // data 
 */
export const getStockDetails = (query) => {
    return new Promise((resolve, reject) => {
  
        const url = `${API.search}?function=${constants.OVERVIEW}&symbol=${encodeURIComponent(query)}&apikey=${constants.APIKEY}`;
        get(url)
        .then(data => {
            if(Object.keys(data).length > 0){
                resolve(data)
            }else {
                reject({status: true, message: constants.NOTFOUND})
            }
        })
        .catch(error => {
            reject({status: true, message: error && error.message})
        })
          

    })
}

export const getStocksList = (query) => {
    return new Promise((resolve, reject) => {
        const url = `${API.search}?function=${constants.SYMBOL_SEARCH}&keywords=${encodeURIComponent(query)}&apikey=${constants.APIKEY}`;
        get(url)
        .then(data => resolve(data))
        .catch(error => reject({status: true, message: error && error.message}))
    })
}