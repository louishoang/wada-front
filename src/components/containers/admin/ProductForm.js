import React, { Component } from 'react';
import { Control, Form, actions } from 'react-redux-form';
import { fetchCategories,
  fetchBrands,
  callCreateProduct,
  callUpdateProduct,
  fetchOptionTypes } from '../../../api/Wada';
import FormError from '../../presentations/FormError';
import DateField from '../../../utils/DateField';
import AsyncSelect from 'react-select/lib/Async';
import { connect } from 'react-redux';
import { getResponseErr } from '../../../utils/ResponseHelpers';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProductsForm extends Component {
  constructor() {
    super()
    this.state = {
      errors: [],
      categories: null,
      brands: null,
      option_types: [],
      productDetailsRoute: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.filterCategory = this.filterCategory.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.filterBrands = this.filterBrands.bind(this)
    this.handleBrandChange = this.handleBrandChange.bind(this)
    this.selectedValue = this.selectedValue.bind(this)
    this.filterOptionTypes = this.filterOptionTypes.bind(this)
    this.handleOptionTypeChange = this.handleOptionTypeChange.bind(this)
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
    const { submitForm, match } = this.props;
    this.setState({ errors: [] })
    let createProductPromise = (this.createForm(match) ? callCreateProduct(product): callUpdateProduct(product))
      .then((res) => {
        if (this.createForm(match)) {
          this.setState({ productDetailsRoute: `/admin/products/${res.data.id}` })
        }
      })
      .catch(err => {
        this.setState({ errors: getResponseErr(err) })
      })
    submitForm(createProductPromise)
  }

  filterOptionTypes(inputValue, callback) {
    fetchOptionTypes()
      .then(res => {
        let options = res.data.filter(i => i.name.toLowerCase().includes(inputValue.toLowerCase()))
          .map(i => {
            const label = `${i.display_name} (${i.name})`
            return { value: i.id, label: label }
          })
        this.setState({ option_types: options })
        callback(options)
      })
  }

  filterCategory(inputValue, callback) {
    fetchCategories()
      .then(res => {
        let options = res.data.filter(i => i.name.toLowerCase().includes(inputValue.toLowerCase()))
          .map(i => {
            const label = i.parent_name !== '' ? `${i.name} - (${i.parent_name})` : i.name
            return { value: i.id, label: label }
          })
        this.setState({ categories: options })
        callback(options)
      })
  }

  filterBrands(inputValue, callback) {
    fetchBrands()
      .then(res => {
        let options = res.data.filter(i => i.name.toLowerCase().includes(inputValue.toLowerCase()))
          .map(i => { return { value: i.id, label: i.name } })
        this.setState({ brands: options })
        callback(options)
      })
  }

  handleCategoryChange(inputValue) {
    this.props.updateCategoryInStore(inputValue.value)
  }

  handleBrandChange(inputValue) {
    this.props.updateBrandInStore(inputValue.value)
  }

  handleOptionTypeChange(inputValue) {
    const selected = inputValue.map(v => v.value)
    this.props.updateOptionTypeIdsInStore(selected)
  }

  selectedValue(options, selected) {
    const selectedValues = Array.isArray(selected) ? selected : [selected]
    if (options) {
      return options.filter(item => selectedValues.includes(item.value));
    }
  }

  render() {
    const { errors, productDetailsRoute, categories, brands, option_types } = this.state
    const { product } = this.props

    if (productDetailsRoute) { return <Redirect to={{ pathname: productDetailsRoute }} /> }

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
              required
              validateOn="blur" />
          </div>
          <div className="form-group">
            <label htmlFor="product-description">Description</label>
            <Control.textarea model="forms.admin.product.description"
              id="product-description"
              className="form-control"
              placeholder="Product's description"
              required
              validateOn="blur"
              rows="10" />
          </div>
          <div className="form-group">
            <label htmlFor="product-option-types">Option Types</label>
            <AsyncSelect
              isMulti
              cacheOptions
              loadOptions={this.filterOptionTypes}
              defaultOptions
              onChange={this.handleOptionTypeChange}
              value={this.selectedValue(option_types, product.option_type_ids)}
            />
            <Control.text model="forms.admin.product.option_type_ids" hidden />
          </div>
          <div className="form-group">
            <label htmlFor="product-category">Category</label>
            <AsyncSelect
              cacheOptions
              loadOptions={this.filterCategory}
              defaultOptions
              onChange={this.handleCategoryChange}
              value={this.selectedValue(categories, product.category_id)}
            />
            <Control.text model="forms.admin.product.category_id" hidden />
          </div>
          <div className="form-group">
            <label htmlFor="product-brand-id">Brand</label>
            <AsyncSelect
              cacheOptions
              loadOptions={this.filterBrands}
              defaultOptions
              onChange={this.handleBrandChange}
              value={this.selectedValue(brands, product.brand_id)}
            />
            <Control.text model="forms.admin.product.brand_id" hidden />
          </div>
          <div className="form-group">
            <label htmlFor="product-keywords">Product Keywords</label>
            <Control.text model="forms.admin.product.product_keywords"
              id="product-keywords"
              className="form-control"
              placeholder="Product's Keywords"
              required
              validateOn="blur" />
          </div>
          <div className="form-group">
            <label htmlFor="product-available-at">Available At</label>
            <Control.text model="forms.admin.product.available_at"
              component={DateField}
              id="product-available-at"
              className="form-control"
              placeholder="Available At"
              requireds
              validateOn="blur" />
          </div>
          <div className="form-group">
            <label htmlFor="product-deleted-at">Deleted At</label>
            <Control.text model="forms.admin.product.deleted_at"
              component={DateField}
              id="product-deleted-at"
              className="form-control"
              placeholder="Deleted At"
              required
              validateOn="blur" />
            <span className="errors small form-text">* Deleted At is automatically set to current time if not specified</span>
          </div>
          <div className="form-group">
            <label htmlFor="product-meta-keywords">Meta Keywords</label>
            <Control.text model="forms.admin.product.meta_keywords"
              id="product-meta-keywords"
              className="form-control"
              placeholder="Meta Keywords"
              required
              validateOn="blur" />
          </div>
          <div className="form-group">
            <label htmlFor="product-meta-description">Meta Description</label>
            <Control.text model="forms.admin.product.meta_description"
              id="product-meta-description"
              className="form-control"
              placeholder="Meta Description"
              required
              validateOn="blur" />
          </div>
          <input type="submit" value="Submit" className="btn btn-success" />
        </Form>
      </div>
    )
  }
}

const stateToProps = (state) => ({
  product: state.forms.admin.product
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
  product: PropTypes.shape
}

export default connect(stateToProps, dispatchToProps)(ProductsForm)