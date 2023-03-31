import { apiUrl } from '../../config';
import { objToQueryString } from '../../config'


//Fetch all boards data using offset and limit!
async function getAllSubTopic(topicID, page, limit) {
  const queryString = objToQueryString({
    page: page,
    limit: limit,
    topicID
  })
  var apiLink;
  if (queryString == null)
    apiLink = apiUrl + '/subTopic/filterSubTopic'
  else
    apiLink = apiUrl + '/subTopic/filterSubTopic?' + queryString
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
async function editSubTopic(subTopicId, name, description, zipFile, pptFile, examID, status) {

  const formData = new FormData()
  formData.append('name', name)
  formData.append('description', description)
  formData.append('file', pptFile)
  formData.append('status', status)

  const data = await fetch(apiUrl + '/subTopic/editSubTopic/' + subTopicId, {
    method: 'PATCH',
    headers: {
      // Accept: 'application/json',
      //   'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  }).then((res) => res.json());

  if (zipFile && examID) {
    const examFormData = new FormData()
    examFormData.append('exam', zipFile)
    examFormData.append('name', name)
    const subTopicExamData = await fetch(apiUrl + '/exam/' + examID, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        //   'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: examFormData,
    }).then((res) => res.json());
  }
  return data;

}

//api function for adding a Board 
async function createSubTopic(topicId, name, description, zipFile, pptFile, status) {

  const formData = new FormData()
  formData.append('name', name)
  formData.append('description', description)
  formData.append('file', pptFile)
  formData.append('status', status)


  const data = await fetch(apiUrl + '/subTopic/createSubTopic/' + topicId, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      //   'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  })
    .then((res) => res.json());
  if (data.status) {
    const subTopicId = data.SubTopic._id
    const examFormData = new FormData()
    examFormData.append('exam', zipFile)
    examFormData.append('name', name)
    const subTopicExamData = await fetch(apiUrl + '/exam/' + subTopicId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        //   'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: examFormData,
    }).then((res) => res.json());
  }
  return data;
}

//api to delete the user from the database
async function deleteSubTopic(subTopicID) {
  const data = await fetch(apiUrl + '/subTopic/deleteSubTopicById/' + subTopicID, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return data;
}

//api to get the details of a particular user by sending the userId
async function getSubTopicById(subTopicID) {
  const data = await fetch(apiUrl + '/subTopic/getSubTopicById/' + subTopicID, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return data;
}


async function getSubTopicByFilter(topicID, searchString, status, startDate, endDate) {
  const queryString = objToQueryString({
    searchString: searchString,
    status: status,
    startDate: startDate,
    endDate: endDate,
    topicID
  })
  var apiLink;
  if (queryString == null)
    apiLink = apiUrl + '/subTopic/filterSubTopic'
  else
    apiLink = apiUrl + '/subTopic/filterSubTopic?' + queryString
  const data = await fetch(apiLink, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return data;
}


export { getAllSubTopic, editSubTopic, createSubTopic, deleteSubTopic, getSubTopicById, getSubTopicByFilter }