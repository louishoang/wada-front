import React, { Component } from 'react';
import HeaderPopUpBanner from '../presentations/HeaderPopUpBanner';
import Header from '../presentations/Header';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <HeaderPopUpBanner/>
        <Header/>
      </div>
    );
  }
}

export default App;
