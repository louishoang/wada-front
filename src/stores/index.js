import { 
  createStore, 
  applyMiddleware, 
  combineReducers 
} from 'redux';
import thunk from 'redux-thunk';
import { combineForms } from 'react-redux-form';
import logger from 'redux-logger';
import initialUserState from '../reducers/UserReducer';
import { initialAdminProductState } from '../reducers/admin/ProductReducer';
import { initialLoginState, authReducer } from '../reducers/LoginReducer';
import adminReducer from '../reducers/admin/AdminReducer';
import isLoading from '../reducers/IsLoadingReducer';
// import reducers here

var store
export default {
  configure: (initialState) => {
    const reducers = combineReducers({ // insert reducers here
      isLoading,
      admin: adminReducer,
      auth: authReducer,
      forms: combineForms({
        user: initialUserState,
        login: initialLoginState,
        admin: {
          product: initialAdminProductState
        }
      }, 'forms')
    })

    const middleware = [thunk, logger] // logger must be the last in the chain

    if (process.env.NODE_ENV === 'development') {
      middleware.unshift(require('redux-immutable-state-invariant').default())
    }

    if (initialState) {
      store = createStore(
        reducers,
        initialState,
        applyMiddleware(...middleware)
      )
      return store
    }

    store = createStore(
      reducers,
      applyMiddleware(...middleware) 
    )

    return store
  },

  currentStore: () => {
    return store
  }
}