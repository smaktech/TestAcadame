import { objToQueryString } from '../../config';
  import { apiUrl } from '../../config';

//Fetch all users data using offset and limit!
async function fetchUser(limit, page) {
  const queryString = objToQueryString({
    page: page,
    limit: limit,
  })
  var apiLink;
  if (queryString == null)
    apiLink = apiUrl + '/auth/getAllUsers'
  else
    apiLink = apiUrl + '/auth/getAllUsers?' + queryString
  const data = await fetch(apiLink, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return data;

}


//api to change the status of the user

async function changeStatus(userId, status) {
  let formData = new FormData();
  formData.append('isActive', status)
  const data = await fetch(apiUrl + '/auth/changeUserStatus/' + userId, {
    method: 'POST',
    // headers: {
    //   Accept: 'application/json',
    //   'Content-Type': 'application/json',
    // },
    body: formData,
  }).then((res) => res.json());
  return data;

}

//api to delete the user from the database
async function deleteUser(userId) {
  const data = await fetch(apiUrl + '/auth/deleteUser/' + userId, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return data;
}

//api to get the details of a particular user by sending the userId
async function getUserById(userId) {
  const data = await fetch(apiUrl + '/auth/getUserById/' + userId, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return data;
}


async function getUserByFilter(searchString, startDate, endDate, page, limit, sortByDate,isActive) {

  const queryString = objToQueryString({
    searchString: searchString,
    startDate: startDate,
    endDate: endDate,
    page: page,
    limit: limit,
    sortByDate: sortByDate,
    isActive:isActive,
  })
  var apiLink;
  if (queryString == null)
    apiLink = apiUrl + '/auth/getAllUsers'
  else
    apiLink = apiUrl + '/auth/getAllUsers?' + queryString
  const data = await fetch(apiLink, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return data;

}


async function addUser(email, password, name,phoneNumber, school) {
  const data = await fetch(`${apiUrl}/auth/signupTest`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password, name,phoneNumber, school}),
  }).then((res) => res.json());

  return data;

}

export { fetchUser,addUser, changeStatus, deleteUser, getUserById, getUserByFilter }