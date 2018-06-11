import { SET_CURRENT_USER } from '../constants'
import isEmpty from 'lodash/isEmpty';

export const initialLoginState = {
  email: '',
  password: ''
}

let user = JSON.parse(localStorage.getItem('user'));

const initialAuthState = user ? {
  isAuthenticated: true,
  user: user
} : {
  isAuthenticated: false,
  user: {}
}

export const authReducer = (state = initialAuthState, action) => {
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
