import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCartItemQuantity, removeItemFromShoppingCart } from '../../actions';
import { callUpdateCartItem, removeCartItem } from '../../api/Wada';
import PropTypes from 'prop-types';

class CartItem extends Component {
  constructor(props) {
    super(props)
  }

  updateQuantity(type) {
    const { dispatchUpdateItemQuantity, item, isAuthenticated } = this.props
    const oldValue = item.quantity
    const max = item.count_on_hand

    let newValue = null
    switch (type) {
    case 'minus':
      newValue = oldValue - 1; break;
    case 'plus':
      newValue = oldValue + 1; break;
    default:
      newValue = oldValue
    }

    if (newValue < 0) {
      newValue = 0
    } else if (newValue > max) {
      newValue = max
    }

    if(isAuthenticated){callUpdateCartItem(item.id, { quantity: newValue })}
    dispatchUpdateItemQuantity(item.id, newValue)
  }

  removeItemFromCart(itemId, e){
    e.preventDefault()
    removeCartItem(itemId)
    this.props.dispatchRemoveItemFromCart(itemId)
  }

  render() {
    const { image, permalink, name, price, quantity, id } = this.props.item

    return (
      <div className="single-cart-box">
        <div className="cart-img">
          <a href="#">
            <img src={image} />
          </a>
        </div>
        <div className="cart-content">
          <h6>
            <Link to={`/products/${permalink}`}>{name}</Link>
          </h6>
          <span className="cart-price">{price}</span>
        </div>
        <div className="cart-actions">
          <div className="product-quantity-box small">
            <div className="col-xs-12 quantity-group">
              <span className="ss-icon product-minus quantity-item"
                data-func="minus"
                onClick={() => this.updateQuantity('minus')}>-</span>
              <input className="quantity quantity-item"
                type="number"
                disabled
                value={quantity} />
              <span className="ss-icon product-plus quantity-item"
                data-func="plus"
                onClick={() => this.updateQuantity('plus')}>+</span>
            </div>
            <div className="row">
              <span>
                <a className="remove-cart-item"
                  onClick={e => this.removeItemFromCart(id, e)}>Remove</a></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CartItem.propTypes = {
  item: PropTypes.object,
  cartId: PropTypes.number,
  updateQuantity: PropTypes.func,
  dispatchUpdateItemQuantity: PropTypes.func,
  dispatchRemoveItemFromCart: PropTypes.func,
  isAuthenticated: PropTypes.bool
}

const stateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

const dispatchToProps = (dispatch) => ({
  dispatchUpdateItemQuantity: (itemId, quantity) => dispatch(updateCartItemQuantity(itemId, quantity)),
  dispatchRemoveItemFromCart: (itemId) => dispatch(removeItemFromShoppingCart(itemId))
})

export default connect(stateToProps, dispatchToProps)(CartItem)