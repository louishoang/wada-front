import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductForm from './ProductForm';
import { connect } from 'react-redux';
import { getProductDetails } from '../../../api/Wada';
import { actions } from 'react-redux-form';
import { NavLink } from 'react-router-dom';

class ProductDetails extends Component{
  constructor(){
    super();
    this.state = {
      product: null
    }
  }

  componentDidMount() {
    const { match, dispatch } = this.props
    getProductDetails(match.params.id)
      .then(res => {
        this.setState({ product: res.data })
        dispatch(actions.change('forms.admin.product', res.data))
      })
  }

  render(){
    const { match } = this.props
    return(
      <div className="row">
        <div className="col-10 columns">
          <ProductForm {...this.props} />
        </div>
        <div className="col-2 columns" id="right-nav">
          <ul className="list-unstyled components">
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