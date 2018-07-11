import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductVariantForm from './ProductVariantForm';
import ProductVariantTable from './ProductVariantTable';

class ProductVariantPage extends Component {
  constructor() {
    super()
  }

  render() {
    const { match, product, refreshProductData} = this.props

    return(
      <Switch>
        <Route exact path={`${match.url}`} render={() => (
          <ProductVariantTable {...this.props} product={product} refreshProductData={refreshProductData} />
        )} />
        <Route exact path={`${match.url}/new`} render={(props) => (
          <ProductVariantForm {...props} product={product} refreshProductData={refreshProductData} />
        )} />
        <Route path={`${match.url}/:id`} render={(props) => (
          <ProductVariantForm {...props} product={product} refreshProductData={refreshProductData} />
        )} />
      </Switch>
    )
   
  }
}

ProductVariantPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  product: PropTypes.object,
  refreshProductData: PropTypes.func
}

export default connect(null, null)(ProductVariantPage)
