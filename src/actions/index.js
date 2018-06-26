import * as constants from '../constants';

export const requestStarted = () => {
  return {
    type: constants.REQUEST_STARTED,
    data: { isLoading: true }
  }
}

export const requestSucceeded = () => {
  return {
    type: constants.REQUEST_SUCCEDED,
    data: { isLoading: false }
  }
}

export const requestFailed = () => {
  return {
    type: constants.REQUEST_FAILED,
    data: { isLoading: false }
  }
}

export const setCurrentUser = (user) => {
  return {
    type: constants.SET_CURRENT_USER,
    user
  }
}

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('user');
    dispatch(setCurrentUser({}))
  }
}

export const fetchAdminProductsSucceded = (data) => {
  return {
    type: constants.GET_ADMIN_PRODUCTS_SUCCEEDED,
    data: {
      products: data.products,
      recordCount: data.record_count
    }
  }
}

export const adminDeletedProduct = (product) => {
  return {
    type: constants.ADMIN_DELETED_PRODUCT,
    data: {
      product: product
    }
  }
}

export const getAdminProductDetailsSucceeded = (product) => {
  return {
    type: constants.GET_ADMIN_PRODUCT_DETAILS_SUCCEEDED,
    data: {
      product: product
    }
  }
}