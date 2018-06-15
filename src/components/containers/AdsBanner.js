import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class AdsBanner extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="image-banner pb-30 pt-30">
        <div className="container">
          <div className="col-img">
            <Link to="/deals">
              <img src={require('../../assets/img/banner/mini-banner.png')} alt="Deals banner" />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default AdsBanner