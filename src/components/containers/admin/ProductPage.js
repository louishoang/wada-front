import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ProductForm from './ProductForm';
import ProductsTable from './ProductsTable';
import PropTypes from 'prop-types';

class ProductPage extends Component {
  constructor() {
    super()
  }

  render() {
    const { match } = this.props
    return (
      <div>
        <Switch>
          <Route exact path={`${match.url}`} component={ProductsTable} />
          <Route path={`${match.url}/new`} component={ProductForm} />
        </Switch>
      </div>
    )
  }
}

ProductPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
}

export default ProductPage