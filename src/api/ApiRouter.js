import { POST, GET } from '../constants';

export const registerUserRoute = (params) => {
  return {
    method: POST,
    url: '/api/v1/users',
    data: { user: params }
  }
}

export const loginRoute = (params) => {
  return {
    method: POST,
    url: '/api/v1/users/sign_in',
    data: { user: params }
  }
}

export const categoriesRoute = () => {
  return {
    method: GET,
    url: '/api/v1/admin/categories'
  }
}

export const brandsRoute = () => {
  return {
    method: GET,
    url: '/api/v1/admin/brands'
  }
}

export const createProductRoute = (product) => {
  return {
    method: POST,
    url: '/api/v1/admin/products',
    data: { product: product }
  }
}