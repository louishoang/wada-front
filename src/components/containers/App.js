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

AdminRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }),
}

const isAdmin = () => {
  const auth = store.currentStore().getState().auth
  return auth.isAuthenticated && (auth.user.role === 'admin' || auth.user.role === 'manager')
}

class App extends Component {
  render() {
    return (
      <Provider store={store.configure(null)}>
        <Router>
          <div className="wrapper">
            <HeaderPopUpBanner />
            <Header />
            <Spinner />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={AboutUs} />
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={LogoutPage} />
              <AdminRoute path="/admin" component={AdminPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
