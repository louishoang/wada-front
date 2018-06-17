import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CategoryDropDown from '../presentations/CategoryDropDown';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'

const MyAccUserView = () => (
  <ul className="ht-dropdown">
    <li>
      <Link to="/my-order">My Orders</Link>
    </li>
    <li>
      <Link to="/my-profile">My Profile</Link>
    </li>
    <li>
      <Link to="/logout">Log Out</Link>
    </li>
  </ul>
)

const MyAccGuestView = () => (
  <ul className="ht-dropdown">
    <li>
      <Link to="/login">Login</Link>
    </li>
    <li>
      <Link to="/register">Register</Link>
    </li>
  </ul>
)

const SignInUserView = ({ first_name }) => {
  return <strong>Hi, {first_name}</strong>
}

const SignInGuestView = () => (
  <strong>Sign in</strong>
)

SignInUserView.propTypes = {
  first_name: PropTypes.string.isRequired
}

const NavigationRow = () => (
  <div className="header-bottom header-sticky">
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-xl-2 col-lg-4 col-md-6 vertical-menu d-none d-lg-block">
          <CategoryDropDown />
        </div>
        <div className="col-xl-10 col-lg-8 col-md-12 ">
          <nav className="d-none d-lg-block">
            <ul className="header-bottom-list d-flex">
              <li>
                <NavLink exact to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/wada-biz" activeClassName="active">Wadamart For Business<i className="fa fa-angle-down"></i></NavLink>
                <ul className="ht-dropdown dropdown-style-two">
                  <li><a href="product.html">product details</a></li>
                  <li><a href="compare.html">compare</a></li>
                </ul>
              </li>
              <li>
                <NavLink to="/classified-ads" activeClassName="active">Classified Ads<i className="fa fa-angle-down"></i></NavLink>
                <ul className="ht-dropdown dropdown-style-two">
                  <li><a href="single-blog.html">blog details</a></li>
                </ul>
              </li>
              <li>
                <NavLink to="/faq" activeClassName="active">FAQ</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
)

class Header extends Component {
  render() {
    const { location, user, isAuthenticated } = this.props

    return (
      <header>
        <div className="header-top-area rose-background">
          <div className="container-fluid">
            <div className="header-top">
              <ul>
                <li><i className="fas fa-truck"></i>Free Shipping on order over $35</li>
              </ul>
              <ul>
                <li className="header-li">
                  <i className="fas fa-heart fa-heart-adjusted"></i>
                  <Link to="/wishlist">Wish List</Link>
                </li>
                <li className="header-li">
                  <i className="fas fa-percent fa-square-border"></i>
                  <Link to="/deals">Deals</Link>
                </li>
                <li className="header-li">
                  <Link to="#">My Account<i className="fa fa-angle-down"></i></Link>
                  {(isAuthenticated) ? <MyAccUserView /> : <MyAccGuestView />}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="header-middle ptb-15 red-background">
          <div className="container-fluid">
            <div className="row align-items-center no-gutters">
              <div className="col-lg-3 col-md-12">
                <div className="logo mb-all-30">
                  <Link to="/">
                    <img src={require('../../assets/img/logo/wada-logo.png')}
                      alt="logo-image"
                      id="main-logo" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 col-md-8 ml-auto mr-auto col-10">
                <div className="">
                  <form action="#" id="main-search-form">
                    <input type="text" className="search-rounded" placeholder="Search..." />
                    <button><i className="fas fa-search"></i></button>
                  </form>
                </div>
              </div>
              <div className="col-lg-3 col-md-12">
                <div className="cart-box mt-all-30">
                  <ul className="d-flex justify-content-lg-end justify-content-center align-items-center">
                    <li>
                      <Link to="/login">
                        <i className="far fa-user"></i>
                        <span className="sign-in">
                          {isAuthenticated ? <SignInUserView {...user} /> : <SignInGuestView />}
                        </span>
                      </Link>
                    </li>
                    <li className="shopping-cart">
                      <Link to="/shopping-cart">
                        <i className="fas fa-shopping-cart"></i>
                        <span className="my-cart">
                          <span className="total-pro">2</span>
                          <span>cart</span>
                        </span>
                      </Link>
                      <ul className="ht-dropdown cart-box-width">
                        <li>
                          <div className="single-cart-box">
                            <div className="cart-img">
                              <a href="#"><img src={require('../../assets/img/products/1.jpg')} alt="cart-image" /></a>
                              <span className="pro-quantity">1X</span>
                            </div>
                            <div className="cart-content">
                              <h6><a href="product.html">Printed Summer Red </a></h6>
                              <span className="cart-price">27.45</span>
                              <span>Size: S</span>
                              <span>Color: Yellow</span>
                            </div>
                            <a className="del-icone" href="#"><i className="ion-close"></i></a>
                          </div>
                          <div className="single-cart-box">
                            <div className="cart-img">
                              <a href="#"><img src={require('../../assets/img/products/2.jpg')} alt="cart-image" /></a>
                              <span className="pro-quantity">1X</span>
                            </div>
                            <div className="cart-content">
                              <h6><a href="product.html">Printed Round Neck</a></h6>
                              <span className="cart-price">45.00</span>
                              <span>Size: XL</span>
                              <span>Color: Green</span>
                            </div>
                            <a className="del-icone" href="#"><i className="ion-close"></i></a>
                          </div>
                          <div className="cart-footer">
                            <ul className="price-content">
                              <li>Subtotal <span>$57.95</span></li>
                              <li>Shipping <span>$7.00</span></li>
                              <li>Taxes <span>$0.00</span></li>
                              <li>Total <span>$64.95</span></li>
                            </ul>
                            <div className="cart-actions text-center">
                              <a className="cart-checkout" href="checkout.html">Checkout</a>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {location.pathname.startsWith('/admin') ? null : <NavigationRow />}
      </header>
    )
  }
}

const stateToProps = (state) => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  }
}

Header.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired
}

export default withRouter(connect(stateToProps)(Header))