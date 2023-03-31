import { apiUrl } from '../../config';
import { objToQueryString } from '../../config'

 


//api to cancel subscription 

async function cancelSubscription(userId, session_id,message) {
 
   
  const data = await fetch(apiUrl + '/userCourse/cancelSubscription?userID=' + userId+"&session_id="+session_id, {
    method: 'PATCH',
    headers: {
      // Accept: 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({message}),
  }).then((res) => res.json());
  return data;

}

async function refundSubscription(userId, session_id) {
 
   
  const data = await fetch(apiUrl + '/userCourse/refundForSubscription?userID=' + userId+"&session_id="+session_id, {
    method: 'PATCH',
    headers: {
      // Accept: 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
   
  }).then((res) => res.json());
  return data;

}
async function getSubscriptionCourses(userId, session_id) {
 
   
  const data = await fetch(apiUrl + '/userCourse/getAllUserCoursesBySessionId/' + userId+"/"+session_id, {
    method: 'GET',
    headers: {
      // Accept: 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
   
  }).then((res) => res.json());
  return data;

}
 
 
export { refundSubscription ,cancelSubscription,getSubscriptionCourses}