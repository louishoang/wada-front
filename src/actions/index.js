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

export const getAdminOptionTypesSucceeded = (optionTypes) => {
  return {
    type: constants.GET_ADMIN_OPTION_TYPES_SUCCEEDED,
    data: {
      optionTypes: optionTypes
    }
  }
}

export const addItemToShoppingCart = (item) => {
  return {
    type: constants.ADD_ITEM_TO_SHOPPING_CART,
    data: {
      item
    }
  }
}

export const updateCartItemQuantity = (variantId, quantity) => {
  return {
    type: constants.UPDATE_CART_ITEM_QUANTITY,
    data: {
      variantId,
      quantity
    }
  }
}

export const removeItemFromShoppingCart = (variantId) => {
  return {
    type: constants.REMOVE_ITEM_FROM_SHOPPING_CART,
    data: {
      variantId
    }
  }
}

export const updateCart = (items, cartId) => {
  return {
    type: constants.UPDATE_ALL_ITEMS_IN_CART,
    data: {
      cart_items: items,
      id: cartId
    }
  }
}

export const resetCart = () => {
  return {
    type: constants.RESET_CART,
    data: {
      id: null,
      cart_items: [],
      subTotal: 0
    }
  }
}