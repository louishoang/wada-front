import axios from 'axios';
import * as ApiRouter from '../api/ApiRouter';
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
    timeout: 4000,
  }

  let accessToken, email; 

  try {
    const user = JSON.parse(localStorage.getItem('user'))
    accessToken = user.authentication_token;
    email = user.email
  } catch (err) {
    accessToken = null
  }

  if (authRequired && accessToken !== null && accessToken !== 'undefined') {
    config = Object.assign(config, {headers: { 'X-User-Email': email, 'X-User-Token': accessToken }})
  }

  return config
}

module.exports = {
  registerUser: (user) => {
    return axios(Object.assign(defaultConfig(false), ApiRouter.registerUserRoute(user)))
  },
  callLogin: (user) => {
    return axios(Object.assign(defaultConfig(false), ApiRouter.loginRoute(user)))
  },
  fetchCategories: () => {
    return axios(Object.assign(defaultConfig(), ApiRouter.categoriesRoute()))
  },
  fetchBrands: () => {
    return axios(Object.assign(defaultConfig(), ApiRouter.brandsRoute()))
  },
  callCreateProduct: (product) => {
    return axios(Object.assign(defaultConfig(), ApiRouter.createProductRoute(product)))
  },
  callProducts: (pageSize, page, sortBy, order) => {
    return axios(Object.assign(defaultConfig(), ApiRouter.getProductsRoute(pageSize, page, sortBy, order)))
  },
  deleteProduct: (id) => {
    return axios(Object.assign(defaultConfig(), ApiRouter.deleteProductRoute(id)))
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