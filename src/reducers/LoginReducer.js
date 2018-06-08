import { SET_CURRENT_USER } from '../constants'
import isEmpty from 'lodash/isEmpty';

export const initialLoginState = {
  email: '',
  password: ''
}

const initialAuthState = {
  isAuthenticated: false,
  user: {}
}

export const currentUserReducer = (state = initialAuthState, action) => {
  switch(action.type) {
  case SET_CURRENT_USER:
    return {
      isAuthenticated: !isEmpty(action.user),
      user: action.user
    }
  default: 
    return state
  }
}
