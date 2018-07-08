import React, { Component } from 'react';
import MainSlider from './MainSlider';
import AdsBanner from './AdsBanner';
import BestSelller from './BestSeller';
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
        const { best_seller, trending_now } = res.data
        this.setState({
          bestSeller: best_seller,
          trendingNow: trending_now,
          loading: false
        })
      })
  }

  render() {
    const { loading, bestSeller } = this.state
    if (loading) { return null }

    return (
      <div>
        <MainSlider />
        <AdsBanner />

        <BestSelller productList={bestSeller}/>
      </div>
    )
  }
}

export default Home