import axios from 'axios';
import {registerUserRoute} from '../api/ApiRouter';
import store from '../stores';
import { requestStarted, requestSucceeded, requestFailed } from '../actions'

let baseURL;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000';
} else {
  baseURL = 'https://wadaback.com';
}

const defaultConfig = (authRequired = true) => {
  let config = {
    baseURL: baseURL,
    timeout: 4000
  }

  const accessToken = localStorage.getItem('accessToken');

  if (!authRequired && accessToken !== null) {
    config.headers['Authorization'] = `Basic ${accessToken}`
  }

  return config
}

module.exports = {
  registerUser: (user) => {
    return axios(Object.assign(defaultConfig(false), registerUserRoute(user)))
  }
}

// Do something before request is sent
axios.interceptors.request.use(function (config) {
  store.currentStore().dispatch(requestStarted())
  return config;
});

axios.interceptors.response.use(function (response) {
  // Do something with response data
  store.currentStore().dispatch(requestSucceeded())
  return response;
}, function (error) {
  // Do something with response error
  store.currentStore().dispatch(requestFailed())
  return Promise.reject(error);
});