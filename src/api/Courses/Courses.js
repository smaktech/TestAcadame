import { apiUrl } from '../../config';
import { objToQueryString } from '../../config'

//Fetch all course data using offset and limit!
async function getAllCourse(page, limit) {
    const queryString = objToQueryString({
        page: page,
        limit: limit,
    })
    var apiLink;
    if (queryString == null)
        apiLink = apiUrl + '/course/filterCourse'
    else
        apiLink = apiUrl + '/course/filterCourse?' + queryString
    const data = await fetch(apiLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}

//api function for update a course 

async function editCourse(courseID, name, boardID, subBoardID, classesID, subjectID, description, status,courseImage) {
    // var details = {
    //     "name": name,
    //     "description": description,
    //     "board": board,
    //     "classes": classes,
    //     "subject": subject,
    //     "topic": topic,
    //     // "coursePicture": coursePicture,
    //     'status':status
    // };

    // var formBody = [];
    // for (var property in details) {
    //     var encodedKey = encodeURIComponent(property);
    //     var encodedValue = encodeURIComponent(details[property]);
    //     formBody.push(encodedKey + "=" + encodedValue);
    // }
    // formBody = formBody.join("&");
    const formData = new FormData();
    formData.append("name", name)
    formData.append("boardID", boardID)
    if (subBoardID) {
        formData.append("subBoardID", subBoardID)
    }
    formData.append("classesID", classesID)
    formData.append("subjectID", subjectID)
    // formData.append("topicIDs", topicIDs)
    formData.append("description", description)
    formData.append("status", status)
    formData.append("image", courseImage)
    const data = await fetch(apiUrl + '/course/editCourse/' + courseID, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/json',
            // 'Content-Type': 'multipart/form-data',
        },
        // body: JSON.stringify({ name, subBoardID, boardID, classesID, subjectID, description, status }),
        body:formData
    }).then((res) => res.json());
    return data;

}

//api function for adding a course 
async function createCourse(name, boardID, subBoardID, classesID, subjectID, description, status, image) {
    const formData = new FormData();
    formData.append("name", name)
    formData.append("boardID", boardID)
    if (subBoardID) {
        formData.append("subBoardID", subBoardID)
    }
    formData.append("classesID", classesID)
    formData.append("subjectID", subjectID)
    // formData.append("topicIDs", topicIDs)
    formData.append("description", description)
    formData.append("status", status)
    formData.append("image", image)

    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }

    const data = await fetch(apiUrl + '/course/createCourse', {
        method: 'POST',
        // headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     'Content-Type': 'multipart/form-data',
        // },
        // body: JSON.stringify({ name, subBoardID, classesID, boardID, subjectID, description, status }),
        body: formData
    })
    .then((res) => res.json());
    return data;
}

//api to delete the course from the database
async function deleteCourse(courseID) {
    const data = await fetch(apiUrl + '/course/deleteCourseById/' + courseID, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
   
    return data;
}

//api to get the details of a particular topic by sending the courdseId
async function getCourseById(courseID) {
    const data = await fetch(apiUrl + '/course/getCourseById/' + courseID, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}




async function getCourseByFilter(searchString, startDate, endDate, sortByDate, status, boardID, subjectID) {
    let obj = {
        boardID: boardID,
        subjectID: subjectID,
        searchString: searchString,
        startDate: startDate,
        endDate: endDate,
        sortByDate: sortByDate,
        status: status
    }
    const queryString = objToQueryString(obj)
    var apiLink;
    if (queryString == null) {
        apiLink = apiUrl + '/course/filterCourse'
    }
    else {
        apiLink = apiUrl + '/course/filterCourse?' + queryString
    }

    console.log("test call back", queryString, obj)
    const data = await fetch(apiLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;

}

//api to get all courses of user
async function getAllUserCourses(userID) {
    const data = await fetch(apiUrl + '/userCourse/getAllUserCourses/' + userID, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}

export { getAllCourse, editCourse, deleteCourse, getCourseByFilter, getCourseById, getAllUserCourses, createCourse }