import React, { Component } from 'react';
import { Control, Form, actions, Errors } from 'react-redux-form';
import { fetchCategories, fetchBrands, callCreateProduct } from '../../../api/Wada';
import FormError from '../../presentations/FormError';
import DateField from '../../../utils/DateField';
import AsyncSelect from 'react-select/lib/Async';
import { connect } from 'react-redux';
import { getResponseErr } from '../../../utils/ResponseHelpers';
import { Redirect } from 'react-router-dom';

class ProductsForm extends Component {
  constructor() {
    super()
    this.state = {
      errors: [],
      category_id: null,
      productDetailsRoute: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.filterCategory = this.filterCategory.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.filterBrands = this.filterBrands.bind(this)
    this.handleBrandChange = this.handleBrandChange.bind(this)
  }

  handleSubmit(product) {
    const { submitForm } = this.props;
    this.setState({ errors: [] })
    let createProductPromise = callCreateProduct(product)
      .then((res) => {
        this.setState({ productDetailsRoute: `/admin/products/${res.data.id}` })
      })
      .catch(err => {
        this.setState({ errors: getResponseErr(err) })
      })
    submitForm(createProductPromise)
  }

  filterCategory(inputValue, callback) {
    fetchCategories()
      .then(res => {
        let options = res.data
        options = options.filter(i => i.name.toLowerCase().includes(inputValue.toLowerCase()))
        callback(options.map(i => {
          const label = i.parent_name !== '' ? `${i.name} - (${i.parent_name})` : i.name
          return { value: i.id, label: label }
        }))
      })
  }

  filterBrands(inputValue, callback) {
    fetchBrands()
      .then(res => {
        let options = res.data
        options = options.filter(i => i.name.toLowerCase().includes(inputValue.toLowerCase()))
        callback(options.map(i => {
          return { value: i.id, label: i.name }
        }))
      })
  }

  handleCategoryChange(inputValue) {
    this.props.updateCategoryInStore(inputValue.value)
  }

  handleBrandChange(inputValue) {
    this.props.updateBrandInStore(inputValue.value)
  }

  render() {
    const { errors, productDetailsRoute } = this.state

    if (productDetailsRoute) { return <Redirect to={{ pathname: productDetailsRoute }} /> }

    return (
      <div>
        <h3 className="mb-20">Create A Product</h3>
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
            <label htmlFor="product-category">Category</label>
            <AsyncSelect
              cacheOptions
              loadOptions={this.filterCategory}
              defaultOptions
              onChange={this.handleCategoryChange}
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

const dispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    updateCategoryInStore: (value) => dispatch(actions.change('forms.admin.product.category_id', value)),
    fetchBrands: () => dispatch(fetchBrands()),
    updateBrandInStore: (value) => dispatch(actions.change('forms.admin.product.brand_id', value)),
    submitForm: (promise) => dispatch(actions.submit('createProduct', promise)),
  }
}

export default connect(null, dispatchToProps)(ProductsForm)