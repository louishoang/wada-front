import { POST, GET, DELETE, PUT } from '../constants';
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

export const optionTypesRoute = (search = {}) => {
  let params = queryString.stringify(search)
  let url = '/api/v1/admin/option_types'
  if (params) { url = `${url}?${params}` }
  return {
    method: GET,
    url: url
  }
}

export const createProductRoute = (product) => {
  return {
    method: POST,
    url: '/api/v1/admin/products',
    data: { product: product }
  }
}

export const updateProductRoute = (product) => {
  return {
    method: PUT,
    url: `/api/v1/admin/products/${product.permalink}`,
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

export const getProductDetailsRoute = (id) => {
  return {
    method: GET,
    url: `/api/v1/admin/products/${id}`
  }
}

// This route is here only for reference and centralize routes
// but the actual process is handle inside ProductImagePage
export const postProductImagesRoute = (id, file) => {
  return {
    method: POST,
    url: `/api/v1/admin/product_images`,
    data: {
      product_id: id,  
      file: file
    }
  }
}

// End Special route

export const deleteProductImageRoute = (id) => {
  return {
    method: DELETE,
    url: `/api/v1/admin/product_images/${id}`,
  }
}

export const getOptionTypesRoute = (pageSize, page, sortBy, order) => {
  let params = {
    page_size: pageSize,
    page: page,
    sort_by: sortBy,
    order: order
  }
  const url = `/api/v1/admin/option_types?${queryString.stringify(params)}`

  return {
    method: GET,
    url: url
  }
}

export const createOptionTypeRoute = (optionType) => {
  return {
    method: POST,
    url: '/api/v1/admin/option_types',
    data: { option_type: optionType }
  }
}

export const getOptionTypeDetailsRoute = (id) => {
  return {
    method: GET,
    url: `/api/v1/admin/option_types/${id}`
  }
}

export const updateOptionTypeRoute = (optionType) => {
  return {
    method: PUT,
    url: `/api/v1/admin/option_types/${optionType.id}`,
    data: { option_type: optionType }
  }
}

export const createVariantRoute = (variant) => {
  return {
    method: POST,
    url: '/api/v1/admin/variants',
    data: { variant: variant }
  }
}

export const deleteProductVariantRoute = (id) => {
  return {
    method: DELETE,
    url: `/api/v1/admin/variants/${id}`
  }
}

export const getPropertiesRoute = () => {
  return {
    method: GET,
    url: `/api/v1/admin/properties`
  }
}

export const deletePropertyRoute = (id) => {
  return {
    method: DELETE,
    url: `/api/v1/admin/properties/${id}`
  }
}

export const createPropertyRoute = (property) => {
  return {
    method: POST,
    url: '/api/v1/admin/properties',
    data: { property: property }
  }
}
