  import { apiUrl } from '../../config';
import { objToQueryString } from '../../config'

//Fetch all Resourse data using offset and limit!
async function getAllResourse(page, limit) {
    const queryString = objToQueryString({
        page: page,
        limit: limit,
    })
    var apiLink;
    if (queryString == null)
        apiLink = apiUrl + '/resource/filterResource'
    else
        apiLink = apiUrl + '/resource/filterResource?' + queryString
    const data = await fetch(apiLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}

//api function for update a resourse 
async function editResourse(resourceID, name, description,linkType, linkString, resourceFile,status) {
    var formData   = new FormData();  
    formData.append("name", name) 
    formData.append("description", description) 
    formData.append("linkType", linkType) 
    formData.append("linkString", linkString)
    formData.append("resourceFile", resourceFile) 
    formData.append("status", status)

    const data = await fetch(apiUrl + '/resource/editResource/' + resourceID , {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
    }).then((res) => res.json());
    return data;

}

//api function for adding a resourse 
async function createResourse(name, description, linkType, linkString, resourceFile, status) {
    var formData   = new FormData();  
    formData.append("name", name) 
    formData.append("description", description) 
    formData.append("linkType", linkType) 
    formData.append("linkString", linkString) 
    formData.append("resourceFile", resourceFile) 
    formData.append("status", status)
    const data = await fetch(apiUrl + '/resource/createResource', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
        body: formData,
    }).then((res) => res.json());
    return data;
}


//api to delete the resourse from the database
async function deleteResourse(resourseID) {
    const data = await fetch(apiUrl + '/resource/deleteResourceById/' + resourseID, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}

//api to get the details of a particular Resourse by sending the courdseId
async function getResourseById(resourseID) {
    const data = await fetch(apiUrl + '/resource/getResourceById/' + resourseID, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}


async function getResourseByFilter(searchString, status, startDate, endDate, page, limit, sortByDate) {
    const queryString = objToQueryString({
        searchString: searchString,
        status: status,
        startDate: startDate,
        endDate: endDate,
        page: page,
        limit: limit,
        sortByDate: sortByDate,
    })
    var apiLink;
    if (queryString == null)
        apiLink = apiUrl + '/resource/filterResource'
    else
        apiLink = apiUrl + '/resource/filterResource?' + queryString
    const data = await fetch(apiLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}

export { getAllResourse, editResourse, deleteResourse, getResourseByFilter, getResourseById, createResourse }