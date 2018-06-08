import * as constants from '../constants';
import { SET_CURRENT_USER } from '../constants';

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
    type: SET_CURRENT_USER,
    user
  }
}

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('accessToken');
    dispatch(setCurrentUser({}))
  }
}
