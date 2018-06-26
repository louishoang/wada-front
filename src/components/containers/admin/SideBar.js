import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class SideBar extends Component {
  render() {
    const { match, location } = this.props
    return (
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <NavLink exact to={`${match.url}`}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to={`${match.url}/orders`}>Orders</NavLink>
          </li>
          <li>
            <NavLink to={`${match.url}/returns`}>Returns</NavLink>
          </li>
          <li>
            <NavLink to={`${match.url}/brand`}>Brand</NavLink>
          </li>
          <li>
            <a href="#homeSubmenu" 
              data-toggle="collapse" 
              className={`${location.pathname.startsWith('/admin/products') ? 'active': null}`}
              aria-expanded="false">Products</a>

            <ul className={`collapse list-unstyled ${location.pathname.startsWith('/admin/products') ? 'show': null}`} id="homeSubmenu">
              <li><NavLink exact to={`${match.url}/products`}>Products</NavLink></li>
              <li><NavLink to={`${match.url}/products/new`}>Create Product</NavLink></li>
              <li><NavLink to={`${match.url}/products/options_types`}>Option Types</NavLink></li>
              <li><NavLink to={`${match.url}/products/properties`}>Properties</NavLink></li>
            </ul>
          </li>
        </ul>
      </nav>
    )
  }
}

SideBar.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  })
}

export default withRouter(SideBar)