import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CartItem from './CartItem';

const EmptyCart = () => {
  return (
    <div id="empty-cart">Your cart is empty!</div>
  )
}

class NavCart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { cart } = this.props
    const cart_items = cart.cart_items

    return (
      <div id="wd-shopping-cart">
        <Link to="#">
          <i id="shopping-cart-icon" className="fas fa-shopping-cart"></i>
          <span className="my-cart">
            <span className="total-pro">{cart_items.reduce((acc, currentValue) => {
              return acc + currentValue.quantity
            }, 0)}</span>
            <span>cart</span>
          </span>
        </Link>
        <ul className="ht-dropdown cart-box-width nav-cart limit-height-500">
          <li>
            {
              cart_items.length > 0 ?
                cart_items.map(item => <CartItem key={item.variant_id} 
                  item={item} cartId={cart.id} {...item}/>) :
                <EmptyCart />
            }

            <div className="cart-footer">
              <ul className="price-content">
                <li>Subtotal <span>${parseFloat(cart.subTotal).toFixed(2)}</span></li>
              </ul>
              <div className="cart-actions text-center">
                <Link className="cart-checkout"
                  to="/shopping-cart">View Cart</Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

const stateToProps = (state) => ({
  cart: state.cart
})

NavCart.propTypes = {
  dispatchRemoveItemFromShoppingCart: PropTypes.func,
  cart: PropTypes.object
}

export default connect(stateToProps, null)(NavCart)