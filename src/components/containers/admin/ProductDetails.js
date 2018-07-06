import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductForm from './ProductForm';
import { connect } from 'react-redux';
import { getProductDetails } from '../../../api/Wada';
import { actions } from 'react-redux-form';
import { NavLink, Route, Switch } from 'react-router-dom';
import ProductImagePage from './ProductImagePage';
import ProductVariantPage from './ProductVariantPage';
import ProductProperties from './ProductProperties';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    },
    this.refreshProductData = this.refreshProductData.bind(this)
  }

  componentDidMount() {
    this.refreshProductData()
  }

  refreshProductData() {
    const { match, dispatch } = this.props
    getProductDetails(match.params.id)
      .then(res => {
        this.setState({ product: res.data })
        dispatch(actions.change('forms.admin.product', res.data))
      })
  }

  render() {
    const { match } = this.props
    const { product } = this.state

    return (
      <div className="row">
        <div className="col-10 columns">
          <Switch>
            <Route exact path={`${match.url}`} component={ProductForm} />
            <Route path={`${match.url}/images`} render={() => (
              <ProductImagePage {...this.props} product={product} refreshProductData={this.refreshProductData} />
            )} />
            <Route path={`${match.url}/variants`} render={() => (
              <ProductVariantPage {...this.props} product={product} refreshProductData={this.refreshProductData}/>
            )} />
            <Route path={`${match.url}/properties`} render={() => (
              <ProductProperties {...this.props} product={product} refreshProductData={this.refreshProductData}/>
            )} />
          </Switch>
        </div>
        <div className="col-2 columns">
          <div id="right-nav">
            <ul className="list-unstyled components" >
              <li>
                <NavLink exact to={`${match.url}`}>Product Details</NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/images`}>Images</NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/variants`}>Variants</NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/properties`}>Properties</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

ProductDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dispatchGetProductDetailsSucceeded: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired
}

const stateToProps = (state) => ({
  product: state.forms.admin.product
})

export default connect(stateToProps, null)(ProductDetails)