import { apiUrl } from '../../config';
import { objToQueryString } from '../../config'


//Fetch all boards data using offset and limit!
async function getAllSubBoard(boardID, page, limit) {
  const queryString = objToQueryString({
    page: page,
    limit: limit,
    boardID
  })
  var apiLink;
  if (queryString == null)
    apiLink = apiUrl + '/subBoard/filterSubBoard'
  else
    apiLink = apiUrl + '/subBoard/filterSubBoard?' + queryString
  const data = await fetch(apiLink, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return data;
}


//api to change the status of the user
async function editSubBoards(SubBoardId, name, status) {

  var details = {
    "name": name,
    "status": status
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  const data = await fetch(apiUrl + '/subBoard/editSubBoard/' + SubBoardId, {
    method: 'PATCH',
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody,
  }).then((res) => res.json());
  return data;

}

//api function for adding a Board 
async function createSubBoard(name, status, boardID, icon) {

  // var details = {
  //   "name": name,
  //   "status": status
  // };

  // var formBody = [];
  // for (var property in details) {
  //   var encodedKey = encodeURIComponent(property);
  //   var encodedValue = encodeURIComponent(details[property]);
  //   formBody.push(encodedKey + "=" + encodedValue);
  // }
  // formBody = formBody.join("&");

  const formData = new FormData()
  formData.append('name', name)
  formData.append('status', status)
  formData.append('boardID', boardID)
  formData.append('image', icon)
  const data = await fetch(apiUrl + '/subBoard/createSubBoard/' + boardID, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'application/mu',
    },
    body: formData,
  })
  // .then((res) => res.json());
  return data;
}

//api to delete the user from the database
async function deleteSubBoards(subBoardID) {
  const data = await fetch(apiUrl + '/subBoard/deleteSubBoardById/' + subBoardID, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return data;
}

//api to get the details of a particular user by sending the userId
async function getSubBoardById(subBoardID) {
  const data = await fetch(apiUrl + '/subBoard/getSubBoardById/' + subBoardID, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return data;
}


async function getSubBoardByFilter(boardID, searchString, status, startDate, endDate) {
  const queryString = objToQueryString({
    searchString: searchString,
    status: status,
    startDate: startDate,
    boardID,
    endDate: endDate,
  })
  var apiLink;
  if (queryString == null)
    apiLink = apiUrl + '/subBoard/filterSubBoard'
  else
    apiLink = apiUrl + '/subBoard/filterSubBoard?' + queryString
  const data = await fetch(apiLink, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return data;
}


export { getAllSubBoard, editSubBoards, deleteSubBoards, getSubBoardById, createSubBoard, getSubBoardByFilter }