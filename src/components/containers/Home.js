import React, { Component } from 'react';
import MainSlider from './MainSlider';
import AdsBanner from './AdsBanner';

class Home extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <MainSlider/>
        <AdsBanner />
      </div>
    )
  }
}

export default Home