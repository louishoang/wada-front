import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CartRow from './CartRow';
import EmptyCart from './EmptyCart';
import PropTypes from 'prop-types';

class Cart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { cart } = this.props
    const { cart_items } = cart

    return (
      <div>
        <div className="cart-main-area ptb-100 ptb-sm-60">
          <div className="container">
            <div className="tab-menu mb-25">
              <div className="section-ttitle">
                <h2 className="fira-header fs-30">Shopping cart</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <form action="#">
                  <div className="table-content table-responsive mb-45">
                    <table>
                      <tbody>
                        {
                          cart_items.length > 0 ?
                            cart_items.map(item => (
                              <CartRow key={item.variant_id} item={item} />
                            ))
                            : <EmptyCart />
                        }
                      </tbody>
                    </table>
                  </div>
                  <div className="row">
                    <div className="col-md-8 col-sm-12">
                      <div className="buttons-cart">
                        <Link to="/search">Continue Shopping</Link>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                      <div className="cart_totals float-md-right text-md-right">
                        <h2>Cart Totals</h2>
                        <br />
                        <table className="float-md-right">
                          <tbody>
                            <tr className="cart-subtotal">
                              <th>Subtotal</th>
                              <td><span className="amount">{cart.subTotal}</span></td>
                            </tr>
                            <tr className="order-total">
                              <th>Total</th>
                              <td>
                                <strong><span className="amount">{cart.subTotal}</span></strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="wc-proceed-to-checkout">
                          <a href="#">Proceed to Checkout</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

Cart.propTypes = {
  cart: PropTypes.object
}

const stateToProps = (state) => ({
  cart: state.cart
})

export default connect(stateToProps, null)(Cart)