import React, { Component } from 'react';
import { Control, Form, actions } from 'react-redux-form';
import {
  fetchCategories,
  fetchBrands,
  callCreateProduct,
  callUpdateProduct,
  fetchOptionTypes
} from '../../../api/Wada';
import FormError from '../../presentations/FormError';
import DateField from '../../../utils/DateField';
import AsyncSelect from 'react-select/lib/Async';
import { connect } from 'react-redux';
import { getResponseErr } from '../../../utils/ResponseHelpers';
import PropTypes from 'prop-types';
import * as constants from '../../../constants';
import * as ReactSelectHelpers from '../../../utils/ReactSelectHelpers';

class ProductsForm extends Component {
  constructor() {
    super()
    this.state = {
      errors: [],
      categories: [],
      brands: [],
      option_types: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.filterCategory = this.filterCategory.bind(this)
    this.filterBrands = this.filterBrands.bind(this)
    this.filterOptionTypes = this.filterOptionTypes.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  createForm(match) {
    return match.path === '/admin/products/new'
  }

  componentDidMount() {
    const { match, resetForm } = this.props
    // Ensure form's fields are blank when switching from edit a product to create a new one.
    // Because we are sharing the same form model in redux store 
    if (this.createForm(match)) { resetForm() }
  }

  handleSubmit(product) {
    const { submitForm, match, history } = this.props;
    this.setState({ errors: [] })
    let createProductPromise = (this.createForm(match) ? callCreateProduct(product) : callUpdateProduct(product))
      .then((res) => history.push(`/admin/products/${res.data.id}`))
      .catch(err => this.setState({ errors: getResponseErr(err) }))
    submitForm(createProductPromise)
  }

  filterOptionTypes(inputValue, callback) {
    fetchOptionTypes()
      .then(res => {
        this.setState({ option_types: res.data })
        let options = res.data.filter(i => {
          return i.name.toLowerCase().includes(inputValue.toLowerCase()) || i.display_name.toLowerCase().includes(inputValue.toLowerCase())
        }).map(i => ReactSelectHelpers.formatForSelect2(i, constants.OPTION_TYPE))
        callback(options)
      })
  }

  filterCategory(inputValue, callback) {
    fetchCategories()
      .then(res => {
        this.setState({ categories: res.data })
        let options = res.data.filter(i => i.name.toLowerCase().includes(inputValue.toLowerCase()))
          .map(i => ReactSelectHelpers.formatForSelect2(i, constants.CATEGORY))
        callback(options)
      })
  }

  filterBrands(inputValue, callback) {
    fetchBrands()
      .then(res => {
        this.setState({ brands: res.data })
        let options = res.data.filter(i => i.name.toLowerCase().includes(inputValue.toLowerCase()))
          .map(i => ReactSelectHelpers.formatForSelect2(i, constants.BRAND))
        callback(options)
      })
  }

  handleSelectChange(inputValue, type) {
    const { updateCategoryInStore, updateBrandInStore, updateOptionTypeIdsInStore } = this.props

    switch (type) {
    case constants.CATEGORY: { return updateCategoryInStore(inputValue.value) }
    case constants.BRAND: { return updateBrandInStore(inputValue.value) }
    case constants.OPTION_TYPE: {
      const selected = inputValue.map(v => v.value)
      return updateOptionTypeIdsInStore(selected)
    }}
  }

  render() {
    const { errors, categories, brands, option_types } = this.state
    const { product, loading } = this.props

    return (
      <div>
        <h3 className="mb-20">{product.name !== null ? `Product Details: ${product.name}` : 'Create A Product'}</h3>
        <FormError messages={errors} />
        <Form model="forms.admin.product"
          className="contact-form"
          onSubmit={(product) => this.handleSubmit(product)}>
          <div className="form-group">
            <label htmlFor="product-name">Name</label>
            <Control.text model="forms.admin.product.name"
              id="product-name"
              className="form-control"
              placeholder="Product's name"
              required />
          </div>
          <div className="form-group">
            <label htmlFor="product-description">Description</label>
            <Control.textarea model="forms.admin.product.description"
              id="product-description"
              className="form-control"
              placeholder="Product's description"
              required
              rows="10" />
          </div>
          <div className="form-group">
            <label htmlFor="product-option-types">Option Types</label>
            <AsyncSelect
              isMulti
              cacheOptions
              loadOptions={this.filterOptionTypes}
              defaultOptions
              onChange={input => this.handleSelectChange(input, constants.OPTION_TYPE)}
              value={ReactSelectHelpers.selectedValue(option_types, product.option_type_ids, constants.OPTION_TYPE)}
            />
            <Control.text model="forms.admin.product.option_type_ids" hidden />
          </div>
          <div className="form-group">
            <label htmlFor="product-category">Category</label>
            <AsyncSelect
              cacheOptions
              loadOptions={this.filterCategory}
              defaultOptions
              onChange={input => this.handleSelectChange(input, constants.CATEGORY)}
              value={ReactSelectHelpers.selectedValue(categories, product.category_id, constants.CATEGORY)}
            />
            <Control.text model="forms.admin.product.category_id" hidden />
          </div>
          <div className="form-group">
            <label htmlFor="product-brand-id">Brand</label>
            <AsyncSelect
              cacheOptions
              loadOptions={this.filterBrands}
              defaultOptions
              onChange={input => this.handleSelectChange(input, constants.BRAND)}
              value={ReactSelectHelpers.selectedValue(brands, product.brand_id, constants.BRAND)}
            />
            <Control.text model="forms.admin.product.brand_id" hidden />
          </div>
          <div className="form-group">
            <label htmlFor="product-keywords">Product Keywords</label>
            <Control.text model="forms.admin.product.product_keywords"
              id="product-keywords"
              className="form-control"
              placeholder="Product's Keywords"
              required />
          </div>
          <div className="form-group">
            <label htmlFor="product-available-at">Available At</label>
            <Control.text model="forms.admin.product.available_at"
              component={DateField}
              id="product-available-at"
              className="form-control"
              placeholder="Available At"
              requireds />
          </div>
          <div className="form-group">
            <label htmlFor="product-deleted-at">Deleted At</label>
            <Control.text model="forms.admin.product.deleted_at"
              component={DateField}
              id="product-deleted-at"
              className="form-control"
              placeholder="Deleted At"
              required />
            <span className="errors small form-text">* Deleted At is automatically set to current time if not specified</span>
          </div>
          <div className="form-group">
            <label htmlFor="product-meta-keywords">Meta Keywords</label>
            <Control.text model="forms.admin.product.meta_keywords"
              id="product-meta-keywords"
              className="form-control"
              placeholder="Meta Keywords"
              required />
          </div>
          <div className="form-group">
            <label htmlFor="product-meta-description">Meta Description</label>
            <Control.text model="forms.admin.product.meta_description"
              id="product-meta-description"
              className="form-control"
              placeholder="Meta Description"
              required />
          </div>
          <button id="submit-button" type="submit" className="btn btn-success" disabled={loading}>
            <span id="submit-text">Submit</span>
            <div className="submit-spinner">
              <span className="icon-spr">Loading</span>
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </button>
        </Form>
      </div>
    )
  }
}

const stateToProps = (state) => ({
  product: state.forms.admin.product,
  loading: state.isLoading
})

const dispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    updateCategoryInStore: (value) => dispatch(actions.change('forms.admin.product.category_id', value)),
    fetchBrands: () => dispatch(fetchBrands()),
    updateBrandInStore: (value) => dispatch(actions.change('forms.admin.product.brand_id', value)),
    updateOptionTypeIdsInStore: (value) => dispatch(actions.change('forms.admin.product.option_type_ids', value)),
    submitForm: (promise) => dispatch(actions.submit('createProduct', promise)),
    resetForm: () => dispatch(actions.reset('forms.admin.product'))
  }
}

ProductsForm.propTypes = {
  submitForm: PropTypes.func,
  resetForm: PropTypes.func,
  updateCategoryInStore: PropTypes.func,
  updateBrandInStore: PropTypes.func,
  updateOptionTypeIdsInStore: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  product: PropTypes.object,
  loading: PropTypes.bool,
  history: PropTypes.object,
}

export default connect(stateToProps, dispatchToProps)(ProductsForm)