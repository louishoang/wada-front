import React, { Component } from 'react'
import PropType from 'prop-types';
import OneXFiveSlideShow from '../presentations/OneXFiveSlideShow';

class TrendingNow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { productList } = this.props

    return (
      <div className="arrivals-product pt-30">
        <div className="container">
          <div className="main-product-tab-area fit-content-height">
            <div className="tab-menu mb-25 no-mg-right">
              <div className="section-ttitle">
                <h3 className="fira-header">Trending Now</h3>
              </div>
            </div>

            <div className="tab-content">
              <div className="best-seller-pro-active">
                <OneXFiveSlideShow list={productList} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

TrendingNow.propTypes = {
  productList: PropType.arrayOf(PropType.object).isRequired
}

export default TrendingNow