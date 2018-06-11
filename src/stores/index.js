import { 
  createStore, 
  applyMiddleware, 
  combineReducers 
} from 'redux';
import thunk from 'redux-thunk';
import { combineForms } from 'react-redux-form';
import logger from 'redux-logger';
import initialUserState from '../reducers/UserReducer';
import { initialLoginState, authReducer } from '../reducers/LoginReducer';
import isLoading from '../reducers/IsLoadingReducer';
// import reducers here

var store
export default {
  configure: (initialState) => {
    const reducers = combineReducers({ // insert reducers here
      isLoading,
      auth: authReducer,
      forms: combineForms({
        user: initialUserState,
        login: initialLoginState
      }, 'forms')
    })

    if (initialState) {
      store = createStore(
        reducers,
        initialState,
        applyMiddleware(thunk, logger) // logger must be the last in the chain
      )

      return store
    }

    store = createStore(
      reducers,
      applyMiddleware(thunk, logger) // logger must be the last in the chain
    )

    return store
  },

  currentStore: () => {
    return store
  }
}