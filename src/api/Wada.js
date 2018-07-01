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
    timeout: 16000
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

const makeRequest = (route) => {
  return axios(Object.assign(defaultConfig(), route))
}

module.exports = {
  config: () => {
    return defaultConfig()
  },
  registerUser: (user) => {
    return axios(Object.assign(defaultConfig(false), ApiRouter.registerUserRoute(user)))
  },
  callLogin: (user) => {
    return axios(Object.assign(defaultConfig(false), ApiRouter.loginRoute(user)))
  },
  fetchCategories: () => {
    return makeRequest(ApiRouter.categoriesRoute())
  },
  fetchBrands: () => {
    return makeRequest(ApiRouter.brandsRoute())
  },
  callCreateProduct: (product) => {
    return makeRequest(ApiRouter.createProductRoute(product))
  },
  callUpdateProduct: (product) => {
    return makeRequest(ApiRouter.updateProductRoute(product))
  },
  callProducts: (pageSize, page, sortBy, order) => {
    return makeRequest(ApiRouter.getProductsRoute(pageSize, page, sortBy, order))
  },
  deleteProduct: (id) => {
    return makeRequest(ApiRouter.deleteProductRoute(id))
  },
  getProductDetails: (id) => {
    return makeRequest(ApiRouter.getProductDetailsRoute(id)) 
  },
  postProductImage: (id, file) => {
    const config = Object.assign(defaultConfig(), { headers: { 'Content-Type': 'multipart/form-data' } })
    const route = ApiRouter.postProductImagesRoute(id, file)
    return axios(config, route)
  },
  deleteProductImage: (id) => {
    return makeRequest(ApiRouter.deleteProductImageRoute(id)) 
  },
  getOptiontypes: (pageSize, page, sortBy, order) => {
    return makeRequest(ApiRouter.getOptionTypesRoute(pageSize, page, sortBy, order))
  },
  callCreateOptionType: (optionType) => {
    return makeRequest(ApiRouter.createOptionTypeRoute(optionType)) 
  },
  getOptionTypeDetails: (id) => {
    return makeRequest(ApiRouter.getOptionTypeDetailsRoute(id)) 
  },
  callUpdateOptionType: (optionType) => {
    return makeRequest(ApiRouter.updateOptionTypeRoute(optionType)) 
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