import adminProductsReducer from './ProductsReducer';
import { GET_ADMIN_PRODUCTS_SUCCEEDED, ADMIN_DELETED_PRODUCT } from '../../constants';

const initialState = {
  products: {
    data: [],
    recordCount: 0
  }
}

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_ADMIN_PRODUCTS_SUCCEEDED:
    return {
      ...state,
      products: adminProductsReducer(state.products, action)
    }
  case ADMIN_DELETED_PRODUCT:
    return {
      ...state,
      products: adminProductsReducer(state.products, action)
    }
  default:
    return state
  }
}

export default adminReducer