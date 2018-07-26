import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeItemFromShoppingCart } from '../../actions';
import PropTypes from 'prop-types';

const CartItem = ({item}) => {
  return (
    <div className="single-cart-box">
      <div className="cart-img">
        <a href="#">
          <img src={item.image} />
        </a>
      </div>
      <div className="cart-content">
        <h6>
          <Link to={`/products/`}>{item.name}</Link>
        </h6>
        <span className="cart-price">{item.price} x {item.quantity}</span>
      </div>
      <a className="del-icone" href="#"><i className="ion-close"></i></a>
    </div>
  )
}

CartItem.propTypes = {
  item: PropTypes.object
}

const EmptyCart = () => {
  return(
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
        <ul className="ht-dropdown cart-box-width nav-cart">
          <li>
            {
              cart_items.length > 0 ?
                cart_items.map(item => <CartItem key={item.variant_id} item={item}/>) :
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

const dispatchToProps = (dispatch) => ({
  dispatchRemoveItemFromShoppingCart: (item) => dispatch(removeItemFromShoppingCart(item))
})

NavCart.propTypes = {
  dispatchRemoveItemFromShoppingCart: PropTypes.func,
  cart: PropTypes.object
}

export default connect(stateToProps, dispatchToProps)(NavCart)