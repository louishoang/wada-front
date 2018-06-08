import { REQUEST_STARTED, REQUEST_SUCCEDED, REQUEST_FAILED } from '../constants';

const isLoading = (state = false, action) => {
  switch(action.type) {
  case REQUEST_STARTED:
    return action.data.isLoading
  case REQUEST_SUCCEDED:
    return action.data.isLoading
  case REQUEST_FAILED:
    return action.data.isLoading
  default:
    return state
  }
}

export default isLoading