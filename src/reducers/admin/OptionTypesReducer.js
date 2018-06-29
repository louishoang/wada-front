import {
  GET_ADMIN_OPTION_TYPES_SUCCEEDED
} from '../../constants'

const initialState = {
  data: [],
  recordCount: 0
}

const adminOptionTypesReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_ADMIN_OPTION_TYPES_SUCCEEDED:
    return {
      ...state,
      data: action.data.optionTypes,
      recordCount: action.data.recordCount
    }
  default:
    return state
  }
}

export default adminOptionTypesReducer

