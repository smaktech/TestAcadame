import { objToQueryString } from '../../config';
  import { apiUrl } from '../../config';

//Fetch all users data using offset and limit!
async function fetchCMS() {
    const data = await fetch(apiUrl + '/cms/getCMS/', {
        method: 'GET',
        headers: {
            // Accept: 'application/json',
            // 'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;

}
async function editTermAndConditions(cmsID, termsAndConditions) {

    var details = {
        "termsAndConditions": termsAndConditions,
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    const data = await fetch(apiUrl + '/cms/editTerms/' + cmsID, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
    }).then((res) => res.json());
    return data;

}

async function editAboutUs(cmsID, aboutUs) {

    var details = {
        "aboutUs": aboutUs,
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    const data = await fetch(apiUrl + '/cms/editAboutUs/' + cmsID, {
        method: 'PATCH',
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
    }).then((res) => res.json());
    return data;

}

async function editPrivacyPolicy(cmsID, privacyPolicy) {

    var details = {
        "privacyPolicy": privacyPolicy,
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    const data = await fetch(apiUrl + '/cms/editPolicy/' + cmsID, {
        method: 'PATCH',
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
    }).then((res) => res.json());
    return data;

}

//Fetch all faq data using offset and limit!
async function getAllFQA(page, limit) {
    const queryString = objToQueryString({
        page: page,
        limit: limit,
    })
    var apiLink;
    if (queryString == null)
        apiLink = apiUrl + '/faq/filterFaq'
    else
        apiLink = apiUrl + '/faq/filterFaq?' + queryString
    const data = await fetch(apiLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}

//function to create the FAQ
async function createFAQ(ques , ans) {

    var details = {
        "ques": ques,
        "ans": ans
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    const data = await fetch(apiUrl + '/faq/createFaq', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
    }).then((res) => res.json());
    return data;

}

//function to edit the FAQ

async function editFAQ(faqID, ques , ans ) {

    var details = {
        "ques": ques,
        "ans": ans
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    const data = await fetch(apiUrl + '/faq/editFaq/' + faqID, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
    }).then((res) => res.json());
    return data;

}

//api to delete the Faq from the database
async function deleteFAQ(faqID) {
    const data = await fetch(apiUrl + '/faq/deleteFaqById/' + faqID, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}

export { fetchCMS, editTermAndConditions, editAboutUs, editPrivacyPolicy, getAllFQA, deleteFAQ,createFAQ,editFAQ }