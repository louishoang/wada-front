import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Home from '../containers/Home';
import AboutUs from '../presentations/AboutUs';
import Register from '../containers/Register';
import HeaderPopUpBanner from '../presentations/HeaderPopUpBanner';
import Header from '../presentations/Header';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <HeaderPopUpBanner />
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={AboutUs} />
            <Route path="/register" component={Register} />
            <Route render={() => <h1 className="text-center">Page not found!</h1>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
