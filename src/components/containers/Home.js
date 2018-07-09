import React, { Component } from 'react';
import MainSlider from './MainSlider';
import AdsBanner from './AdsBanner';
import BestSelller from './BestSeller';
import TrendingNow from './TrendingNow';
import HotDeals from './HotDeals';
import FooterSection from './FooterSection';
import NewArrivals from './NewArrivals';
import UpSellingBanner from '../presentations/UpSellingBanner';
import { getFeaturedProducts } from '../../api/Wada';

class Home extends Component {
  constructor() {
    super()
    this.state = {
      bestSeller: [],
      hotDeals: [],
      trendingNow: [],
      loading: true
    }
  }

  componentDidMount() {
    getFeaturedProducts()
      .then(res => {
        const { best_seller, trending_now, hot_deals } = res.data
        this.setState({
          bestSeller: best_seller,
          trendingNow: trending_now,
          hotDeals: hot_deals,
          loading: false
        })
      })
  }

  render() {
    const { loading, bestSeller, trendingNow, hotDeals } = this.state

    return (
      <div>
        <MainSlider />
        <AdsBanner />
        {
          loading ? null :
            (
              <div>
                <BestSelller productList={bestSeller} />
                <NewArrivals />
                <UpSellingBanner />
                <HotDeals productList={hotDeals} />
                <TrendingNow productList={trendingNow} />
              </div>
            )
        }

        <FooterSection/>
      </div>
    )
  }
}

export default Home