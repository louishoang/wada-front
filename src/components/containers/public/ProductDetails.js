import React, { Component } from 'react'
import { public as PublicApi } from '../../../api/Wada';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isequal';
import { addItemToCart } from '../../../api/Wada';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { ITEM_TYPE_SHOPPING_CART } from '../../../constants';

class AsNavFor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  render() {
    const { list } = this.props

    if (list === null) { return null }

    return (
      <div>
        <Slider
          lazyLoad={true}
          className="main-product-slider"
          asNavFor={this.state.nav2}
          arrows={false}
          ref={slider => (this.slider1 = slider)}
        >
          {
            list.map(p => (
              <div key={p.id} className="tab-pane fade show active">
                <img src={p.square_url} alt="Product Preview" />
              </div>
            ))
          }
        </Slider>
        <Slider
          lazyLoad={true}
          className="vertical-thumbnails"
          infinite={true}
          asNavFor={this.state.nav1}
          ref={slider => (this.slider2 = slider)}
          slidesToShow={4}
          slidesToScroll={1}
          vertical={true}
          verticalSwiping={true}
          focusOnSelect={true}
        >
          {
            list.map(p => (
              <div key={p.id}>
                <img src={p.thumbnail_url} alt="Product Preview" />
              </div>
            ))
          }
        </Slider>
      </div>
    );
  }
}

AsNavFor.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object)
}

class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: null,
      optionList: [],
      selectedVariant: null,
      quantity: 1
    }
    this.selectAppropriateVariant = this.selectAppropriateVariant.bind(this)
    this.addItemToCart = this.addItemToCart.bind(this)
  }

  collectOptionList(product) {
    let list = {}
    product.variants.map(v => v.option_list)
      .forEach(obj => {
        Object.entries(obj).forEach(([optionType, optionValue]) => {
          if (!list.hasOwnProperty(optionType)) {
            list[optionType] = [optionValue]
          } else {
            if (!list[optionType].includes(optionValue)) { list[optionType].push(optionValue) }
          }
        })
      })
    return list
  }

  componentDidMount() {
    const { match } = this.props
    const productId = match.params.id
    PublicApi.getProductDetails(productId)
      .then(res => {
        const optionList = this.collectOptionList(res.data)
        this.setState({ 
          product: res.data, 
          optionList: optionList,
          selectedVariant: res.data.variants.find(v => v.master)
        })
      })
  }

  selectAppropriateVariant() {
    const { product } = this.state
    const elms = document.getElementsByClassName('pd-select');
    let options = {}

    for (let i = 0; i <= elms.length - 1; i++) {
      const key = elms[i].dataset.optionType
      const value = elms[i].options[elms[i].selectedIndex].value
      options[key] = value
    }

    const selectedVariant = product.variants.find(p => isEqual(p.option_list, options))
    this.setState({ selectedVariant: selectedVariant })
  }

  inStock(variant){
    if(typeof variant === "undefined"){return false}
    return variant.inventory_attributes.count_on_hand > 0
  }

  updateQuantity(type, value){
    const oldValue = this.state.quantity
    const max = this.state.selectedVariant.inventory_attributes.count_on_hand

    let newValue = null
    switch(type){
    case 'minus':
      newValue = oldValue - 1; break;
    case 'plus':
      newValue = oldValue + 1; break;
    case 'change':
      newValue = value; break;
    default: 
      newValue = oldValue
    }

    if(newValue < 1){
      newValue = 1
    }else if(newValue > max){
      newValue = max
    }

    this.setState({ quantity: newValue })
  }

  addItemToCart(e){
    e.preventDefault();
    const { quantity, selectedVariant, product } = this.state
    const { dispatchAddItemToCart, user, cart } = this.props

    if(user && user.id) { 
      const cartItem = {
        variant_id: selectedVariant.id,
        quantity: quantity,
        cart_id: cart.id,
        item_type: ITEM_TYPE_SHOPPING_CART
      }
      addItemToCart(cartItem)
    }
    
    dispatchAddItemToCart({
      variant_id: selectedVariant.id,
      quantity: quantity,
      count_on_hand: selectedVariant.inventory_attributes.count_on_hand,
      price: selectedVariant.price,
      item_type: ITEM_TYPE_SHOPPING_CART,
      option_list: selectedVariant.option_list,
      name: product.name,
      permalink: product.permalink,
      image: product.product_images[0].thumbnail_url })
  }

  render() {
    const { product, optionList, selectedVariant, quantity } = this.state
    if (product === null) { return null }

    return (
      <div className="main-product-thumbnail ptb-20 ptb-sm-60 wada-product">
        <div className="col-lg-10 col-md-12 offset-lg-1">
          <div className="container-fluid">
            <div className="thumb-bg">
              <div className="row">
                <div className="col-lg-6 mb-all-40">
                  <div className="tab-content fit-content-height">
                    <AsNavFor list={product.product_images} />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="thubnail-desc fix">
                    <div className="sku">SKU: {selectedVariant.sku}</div>
                    <h2 className="product-header fira-header fs-30">{product.name}</h2>
                    <div className="pro-price mtb-30">
                      <p className="d-flex align-items-center">
                        {/* <span className="prev-price">16.51</span> */}
                        <span className="price">${product.price}</span>
                        {/* <span className="saving-price">save 8%</span> */}
                      </p>
                    </div>
                    <p className="mb-20 pro-desc-details pre-wrap">{product.description}</p>

                    <div className="quantity-group mb-20">
                      {
                        Object.entries(optionList).map(([key, value]) => (
                          <div className="product-size clearfix quantity-item pr-30" key={key}>
                            <label>{key}</label>
                            <select className="pd-select" 
                              data-option-type={key}
                              onChange={this.selectAppropriateVariant}
                              defaultValue={selectedVariant.option_list[key]}>
                              {value.map(k => <option key={k}>{k}</option>)}
                            </select>
                          </div>
                        ))
                      }
                    </div>

                    <div className="box-quantity d-flex hot-product2">
                      <form action="#">
                        <div className="left product-quantity-box">
                          <label htmlFor="quantity">Qty</label>
                          <div className="col-xs-12 quantity-group">
                            <span className="ss-icon product-minus quantity-item" 
                              data-func="minus"
                              onClick={() => this.updateQuantity('minus')}>-</span>
                            <input className="quantity quantity-item" 
                              type="number" 
                              min="1" 
                              value={quantity}
                              onChange={e => this.updateQuantity('change', e.target.value)} />
                            <span className="ss-icon product-plus quantity-item" 
                              data-func="plus"
                              onClick={() => this.updateQuantity('plus')}>+</span>
                            <div className="pro-ref mt-20 quantity-item pl-20">
                              <p>
                                {
                                  this.inStock(selectedVariant) ? (
                                    <span className="in-stock">
                                      <i className="fas fa-check"></i> IN STOCK
                                      <span className="badge badge-border-only">
                                        {selectedVariant.inventory_attributes.count_on_hand}
                                      </span>
                                    </span>
                                  ) : (
                                    <span className="out-stock">
                                      <i className="fas fa-times"></i> OUT OF STOCK
                                    </span>
                                  )
                                }
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="ptb-30">
                          <button className="btn btn-secondary btn-block btn-lg btn-add-to-cart active"
                            disabled={!this.inStock(selectedVariant)}
                            onClick={(e) => this.addItemToCart(e)}>
                            Add To Cart
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="pro-actions">
                      <div className="actions-secondary">
                        <a href="wishlist.html" title="" data-original-title="WishList">
                          <i className="far fa-heart"></i> <span>Add to WishList</span>
                        </a>
                      </div>
                    </div>

                    {/* TODO: Social media sharing */}
                    {/* <div className="socila-sharing mt-25">
                      <ul className="d-flex">
                        <li>share</li>
                        <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i className="fa fa-google-plus-official" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i className="fa fa-pinterest-p" aria-hidden="true"></i></a></li>
                      </ul>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  dispatchAddItemToCart: PropTypes.func,
  user: PropTypes.object,
  cart: PropTypes.object
}

const stateToProps = (state) => ({
  cart: state.cart,
  user: state.auth.user
})

const dispatchToProps = (dispatch) => ({
  dispatchAddItemToCart: (quantity, item) => dispatch(actions.addItemToShoppingCart(quantity, item))
})


export default connect(stateToProps, dispatchToProps)(ProductDetails)