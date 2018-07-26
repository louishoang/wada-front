import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CategoryDropDown from '../presentations/CategoryDropDown';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import NavCart from '../containers/NavCart';

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

const HeaderTopRow = ({ user, isAuthenticated }) => (
  <div className="header-top-area rose-background">
    <div className="container-fluid">
      <div className="header-top">
        <ul>
          <li><i className="fas fa-truck"></i>Free Shipping on order over $35</li>
        </ul>
        <ul>
          {['admin', 'manager'].includes(user.role) ? (
            <li className="header-li">
              <i className="fas fa-toolbox"></i>
              <Link to="/admin">Admin Console</Link>
            </li>
          ) : (null)}
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
)

HeaderTopRow.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    authentication_token: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    role: PropTypes.string,
    auth_token_expired_at: PropTypes.string,
  }),
  isAuthenticated: PropTypes.bool
}

const HeaderLogoRow = ({user, isAuthenticated}) => (
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
              <li className="shopping-cart"><NavCart/></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

)

HeaderLogoRow.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    authentication_token: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    role: PropTypes.string,
    auth_token_expired_at: PropTypes.string,
  }),
  isAuthenticated: PropTypes.bool
}

class Header extends Component {
  render() {
    const { location, user, isAuthenticated } = this.props

    return (
      <header>
        <HeaderTopRow user={user} isAuthenticated={isAuthenticated} />
        <HeaderLogoRow user={user} isAuthenticated={isAuthenticated} />
        {location.pathname.startsWith('/admin') ? null : <NavigationRow />}
      </header>
    )
  }
}

Header.propTypes = {
  location: PropTypes.shape
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

export default withRouter(connect(stateToProps, null)(Header))