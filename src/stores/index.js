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
import { initialAdminOptionTypeState } from '../reducers/admin/OptionTypeFormReducer';
import { initialLoginState, authReducer } from '../reducers/LoginReducer';
import adminReducer from '../reducers/admin/AdminReducer';
import isLoading from '../reducers/IsLoadingReducer';
import cartReducer from '../reducers/CartReducer';
import { initialAdminVariantState } from '../reducers/admin/VariantReducer';
import { initialAdminPropertyState } from '../reducers/admin/PropertyReducer';
import { initialAdminProductPropertyState } from '../reducers/admin/ProductPropertyReducer';
import { loadState } from './localStorage';
// import reducers here

let store
export default {
  configure: (initialState) => {
    const reducers = combineReducers({ // insert reducers here
      isLoading,
      admin: adminReducer,
      auth: authReducer,
      cart: cartReducer,
      forms: combineForms({
        user: initialUserState,
        login: initialLoginState,
        admin: {
          product: initialAdminProductState,
          optionType: initialAdminOptionTypeState,
          variant: initialAdminVariantState,
          property: initialAdminPropertyState,
          productProperties: initialAdminProductPropertyState
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
      loadState(), // persisted state from localStorage
      applyMiddleware(...middleware) 
    )

    return store
  },
  currentStore: () => {
    return store
  }
}