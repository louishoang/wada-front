import React, { Component } from 'react'
import PropType from 'prop-types';
import TwoXFiveSlideShow from '../presentations/TwoXFiveSlideShow';

class TrendingNow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { productList } = this.props

    return (
      <div className="hot-deal-products">
        <div className="container" id="hp-hot-deals">
          <div className="post-title pb-30 pt-60">
            <h2 className="fira-header fs-25">hot deals</h2>
          </div>     
          <div className="hot-deal-active">
            <TwoXFiveSlideShow list={productList} />
          </div>
        </div>
        <div className="container pt-10 pb-30 text-center" id="hp-shop-more">
          <img src={require('../../assets/img/banner/Homepage-showmore.png')} alt="Shop more banner" />
        </div>
      </div>
    )
  }
}

TrendingNow.propTypes = {
  productList: PropType.arrayOf(PropType.object).isRequired
}

export default TrendingNow