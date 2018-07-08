import React, { Component } from 'react'
import PropType from 'prop-types';
import OneXFiveSlideShow from '../presentations/OneXFiveSlideShow';

class BestSeller extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { productList } = this.props

    return (
      <div className="second-arrivals-product pb-45 pb-sm-5 pt-30">
        <div className="container">
          <div className="main-product-tab-area">
            <div className="tab-menu mb-25 no-mg-right">
              <div className="section-ttitle">
                <h3>Best Seller</h3>
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

BestSeller.propTypes = {
  productList: PropType.arrayOf(PropType.object).isRequired
}

export default BestSeller