import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import store from '../../stores';
import { Provider } from 'react-redux';
import Home from '../containers/Home';
import AboutUs from '../presentations/AboutUs';
import RegisterForm from '../containers/RegisterForm';
import HeaderPopUpBanner from '../presentations/HeaderPopUpBanner';
import Header from '../containers/Header';
import Spinner from '../containers/Spinner';
import LoginForm from '../containers/LoginForm';
import '../../assets/img/favicon.ico';
import LogoutPage from './LogoutPage';
import AdminPage from '../containers/admin/AdminPage';
import NotFoundPage from '../presentations/NotFoundPage';
import PropTypes from 'prop-types';
import ProductDetails from '../containers/public/ProductDetails';
import { saveState } from '../../stores/localStorage';
import { connect } from 'react-redux';
import watch from 'redux-watch';
import isEmpty from 'lodash/isEmpty';
import { resetCart } from '../../actions';
import Cart from './carts/Cart';

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAdmin()) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated()) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

AdminRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }),
}

PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }),
}

var wadaStore = store.configure(null)

const isAdmin = () => {
  const auth = wadaStore.getState().auth
  return auth.isAuthenticated && (auth.user.role === 'admin' || auth.user.role === 'manager')
}

const isAuthenticated = () => {
  const auth = wadaStore.getState().auth
  return auth.isAuthenticated && auth.user && auth.user.email
}

let w = watch(wadaStore.getState, 'auth.user')

wadaStore.subscribe(w((newUser, oldUser) => {
  // Delete all items in shopping cart on logout
  if (oldUser !== newUser && isEmpty(newUser)) {
    wadaStore.dispatch(resetCart())
    return null;
  }
}))

class App extends Component {
  componentDidMount() {
    wadaStore.subscribe(() => {
      const currentStore = wadaStore.getState()

      saveState({
        cart: currentStore.cart,
        auth: currentStore.auth
      })
    })
  }

  render() {
    return (
      <Provider store={wadaStore}>
        <Router>
          <div className="wrapper">
            <HeaderPopUpBanner />
            <Header />
            <Spinner />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/products/:id" component={ProductDetails} />
              <Route path="/about" component={AboutUs} />
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={LogoutPage} />
              <AdminRoute path="/admin" component={AdminPage} />
              <PrivateRoute path="/cart" component={Cart} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

const stateToProps = (state) => ({
  user: state.auth.user
})

export default connect(stateToProps, null)(App);
