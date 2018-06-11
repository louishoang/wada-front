import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
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
import NotFoundPage from '../presentations/NotFoundPage';

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
              <Route path="/logout" component={LogoutPage}/>
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
