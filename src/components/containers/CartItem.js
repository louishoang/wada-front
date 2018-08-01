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

    if (newValue < 1) {
      newValue = 1
    } else if (newValue > max) {
      newValue = max
    }

    if(isAuthenticated){callUpdateCartItem(item.id, { quantity: newValue })}
    dispatchUpdateItemQuantity(item.variant_id, newValue)
  }

  // If a user is not logged in, cart item doesn't have the ID from the backend
  // Have to use variantID to find and remove item from shopping cart
  removeItemFromCart(itemId, variantId, e){
    e.preventDefault()
    if (itemId) { removeCartItem(itemId) }
    this.props.dispatchRemoveItemFromCart(variantId)
  }

  render() {
    const { image, permalink, name, price, quantity, id, variant_id } = this.props.item

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
                  onClick={e => this.removeItemFromCart(id, variant_id, e)}>Remove</a></span>
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
  dispatchRemoveItemFromCart: (variantId) => dispatch(removeItemFromShoppingCart(variantId))
})

export default connect(stateToProps, dispatchToProps)(CartItem)