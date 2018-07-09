import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { fetchNewArrivalsByCategory } from '../../api/Wada';
import ThreeXFiveSlideShow from '../presentations/ThreeXFiveSlideShow';

class NewArrivals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      currentCategory: 'Fashion'
    }
    this.fetchProducts = this.fetchProducts.bind(this)
    this.updateTabContent = this.updateTabContent.bind(this)
  }

  componentDidMount() {
    this.fetchProducts()
  }

  updateTabContent(e) {
    const category = e.target.dataset.category

    if (category !== this.state.currentCategory){
      this.fetchProducts(category)
    } 
  }

  fetchProducts(category = 'Fashion') {
    fetchNewArrivalsByCategory(category)
      .then(res => this.setState({ productList: res.data, currentCategory: category }))
  }

  render() {
    const { productList } = this.state

    return (
      <div className="arrivals-product pb-20 pb-sm-45">
        <div className="container">
          <div className="main-product-tab-area">
            <div className="tab-menu mb-25">
              <div className="section-ttitle">
                <h2 className="fira-header fs-30">New Arrivals</h2>
              </div>
              <ul className="nav tabs-area mgr-30" role="tablist">
                <li className="nav-item">
                  <Link to="/" 
                    className="nav-link" 
                    onClick={e => this.updateTabContent(e)}
                    data-category="Fashion">Fashion</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" 
                    className="nav-link" 
                    onClick={e => this.updateTabContent(e)}
                    data-category="Health &amp; Beauty">Health &amp; Beauty</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" 
                    className="nav-link" 
                    onClick={e => this.updateTabContent(e)}
                    data-category="Baby">Baby</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" 
                    className="nav-link" 
                    onClick={e => this.updateTabContent(e)}
                    data-category="Furniture &amp; Home Decor">Furniture &amp; Home Decor</Link>
                </li>
              </ul>
            </div>
            <div className="tab-content">
              <div className="electronics-pro-active">
                <ThreeXFiveSlideShow list={productList}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewArrivals