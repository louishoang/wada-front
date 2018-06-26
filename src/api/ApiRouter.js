import { POST, GET, DELETE } from '../constants';
import queryString from 'query-string';

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

export const getProductsRoute = (pageSize, page, sortBy, order) => {
  const params = {
    page_size: pageSize,
    page: page,
    sort_by: sortBy,
    order: order
  }
  const url = `/api/v1/admin/products?${queryString.stringify(params)}`

  return {
    method: GET,
    url: url
  }
}

export const deleteProductRoute = (id) => {
  return {
    method: DELETE,
    url: `/api/v1/admin/products/${id}`
  }
}