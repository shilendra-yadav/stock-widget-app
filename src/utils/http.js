export const get = (url, headers = {}) => {
	  
	return fetch(url, {
		method: 'GET',
		headers: headers
	}).then((response) => response.json());
};