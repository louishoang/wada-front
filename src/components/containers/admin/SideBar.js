import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class SideBar extends Component {
  showProductDropDown(currentPath) {
    const pathUnderProducts = ['/admin/products', '/admin/option_types', '/admin/properties']
    for (let i = 0; i < pathUnderProducts.length; i++) {
      if (currentPath.startsWith(pathUnderProducts[i])) {
        return true
      }
    }
    false
  }

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
              className={`${this.showProductDropDown(location.pathname)} ? 'active': null}`}
              aria-expanded="false">Products</a>

            <ul className={`collapse list-unstyled ${this.showProductDropDown(location.pathname) ? 'show' : null}`} id="homeSubmenu">
              <li><NavLink exact to={`${match.url}/products`}>Products</NavLink></li>
              <li><NavLink to={`${match.url}/products/new`}>Create Product</NavLink></li>
              <li><NavLink to={`${match.url}/option_types`}>Option Types</NavLink></li>
              <li><NavLink to={`${match.url}/properties`}>Properties</NavLink></li>
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