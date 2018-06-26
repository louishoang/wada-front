import {
  GET_ADMIN_PRODUCTS_SUCCEEDED,
  ADMIN_DELETED_PRODUCT
} from '../../constants'

const initialState = {
  data: [],
  recordCount: 0
}

const adminProductsReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_ADMIN_PRODUCTS_SUCCEEDED:
    return {
      ...state,
      data: action.data.products,
      recordCount: action.data.recordCount
    }
  case ADMIN_DELETED_PRODUCT:
    
    return {
      ...state,
      data: state.data.map(product => {
        if (product.permalink !== action.data.product) {
          return product
        }
        return {
          ...product,
          status: 'Deleted'
        }
      })
    }
  default:
    return state
  }
}

export default adminProductsReducer

