/**
 * API url
 */
let BASE_URL = 'https://www.alphavantage.co';

if(process.env === 'prod'){
  BASE_URL = 'https://www.alphavantage.co';
}

 export const API = {
     search: `${BASE_URL}/query`
 };

 export const constants = {
    APIKEY: 'LLINMWI8PHF92AEU',
    OVERVIEW: 'OVERVIEW',
    SYMBOL_SEARCH: 'SYMBOL_SEARCH',
    DEBOUNCE_DELAY: 500,
    NOTFOUND: 'Record not found',
    symbol: '1. symbol',
    name: '2. name', 
    Loading: 'Loading...'
 }
