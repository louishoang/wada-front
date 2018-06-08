import axios from 'axios';
import {registerUserRoute} from '../api/ApiRouter';

let baseURL;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000';
} else {
  baseURL = 'https://wadaback.com';
}

const defaultConfig = (authRequired = true) => {
  let config = {
    baseURL: baseURL,
    timeout: 1000
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