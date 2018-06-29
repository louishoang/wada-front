import adminProductsReducer from './ProductsReducer';
import adminOptionTypesReducer from './OptionTypesReducer';
import * as constants from '../../constants';

const initialState = {
  products: {
    data: [],
    recordCount: 0
  },
  optionTypes: {
    data: [],
    recordCount: 0
  }
}

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
  case constants.GET_ADMIN_PRODUCTS_SUCCEEDED:
    return {
      ...state,
      products: adminProductsReducer(state.products, action)
    }
  case constants.ADMIN_DELETED_PRODUCT:
    return {
      ...state,
      products: adminProductsReducer(state.products, action)
    }
  case constants.GET_ADMIN_OPTION_TYPES_SUCCEEDED:
    return {
      ...state,
      optionTypes: adminOptionTypesReducer(state.optionTypes, action)
    }
  default:
    return state
  }
}

export default adminReducer