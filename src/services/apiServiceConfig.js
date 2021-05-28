import axios from 'axios';
import { API_URL } from '../constants/actionTypes'

let token = localStorage.getItem('token');
token = token && token !== '' ? token : '';

const Instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token 
  }
});

const MultipartInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': 'Bearer ' + token 
  }
});

const exportConst = { Instance, MultipartInstance}
export default exportConst;

axios.interceptors.request.use(request => {
  // Edit request config
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  if (typeof response !== Object && typeof response !== 'object')
    JSON.parse(response);
  // Edit response config
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

export const apiHeader = {
  headers : {
    "content-type" : "application/json"
  }
}
