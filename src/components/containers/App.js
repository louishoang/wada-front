import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Home from '../containers/Home';
import AboutUs from '../presentations/AboutUs';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={AboutUs}/>
            <Route render={() => <h1 className="text-center">Page not found!</h1> } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
