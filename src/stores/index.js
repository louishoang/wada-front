import { 
  createStore, 
  applyMiddleware, 
  combineReducers 
} from 'redux';
import thunk from 'redux-thunk';
import { combineForms } from 'react-redux-form';
import initialUserState from '../reducers/UserReducers';
// import reducers here

var store
export default {
  configure: (initialState) => {
    const reducers = combineReducers({ // insert reducers here
      forms: combineForms({
        user: initialUserState
      }, 'forms')
    })

    if (initialState) {
      store = createStore(
        reducers,
        initialState,
        applyMiddleware(thunk)
      )

      return store
    }

    store = createStore(
      reducers,
      applyMiddleware(thunk)
    )

    return store
  },

  currentStore: () => {
    return store
  }
}