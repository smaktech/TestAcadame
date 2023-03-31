  import { apiUrl } from '../../config';
import { objToQueryString } from '../../config'

//Fetch all Earnings data using offset and limit!
async function getAllEarnings(page, limit) {
    const queryString = objToQueryString({
        page: page,
        limit: limit,
    })
    var apiLink;
    if (queryString == null)
        apiLink = apiUrl + '/earning/filterEarning'
    else
        apiLink = apiUrl + '/earning/filterEarning?' + queryString
    const data = await fetch(apiLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}

//function for filter
async function getEarningsByFilter(searchString, status, startDate, endDate,amountFrom,amountTo, page, limit, sortByDate) {
    const queryString = objToQueryString({
        searchString: searchString,
        status: status,
        startDate: startDate,
        endDate: endDate,
        amountFrom: amountFrom,
        amountTo: amountTo,
        page: page,
        limit: limit,
        sortByDate: sortByDate,
    })
    var apiLink;
    if (queryString == null)
        apiLink = apiUrl + '/earning/filterEarning'
    else
        apiLink = apiUrl + '/earning/filterEarning?' + queryString
    const data = await fetch(apiLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}

//function for filter
async function getEarningsByUserId(userId) {
   
    var apiLink;
   
        apiLink = apiUrl + '/earning/getEarningByUserID/'+userId
    const data = await fetch(apiLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}


export { getAllEarnings, getEarningsByFilter,getEarningsByUserId }