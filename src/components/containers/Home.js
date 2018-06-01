import React, { Component } from 'react'
import HeaderPopUpBanner from '../presentations/HeaderPopUpBanner';
import Header from '../presentations/Header';

class Home extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <HeaderPopUpBanner />
        <Header />
        Home
      </div>
    )
  }
}

export default Home