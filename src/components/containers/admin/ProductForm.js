import React, { Component } from 'react';
import { Control, Form, actions, Errors } from 'react-redux-form';
import FormError from '../../presentations/FormError';
import DateField from '../../../utils/DateField';

class ProductsForm extends Component {
  constructor() {
    super()
    this.state = {
      errors: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(product){
    // call api here
  }

  render() {
    const { errors } = this.state
    return (
      <div>
        <h3 className="mb-20">Create A Product</h3>
        <FormError messages={errors}/>
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
            <label htmlFor="product-keywords">Product Keywords</label>
            <Control.text model="forms.admin.product.product_keywords"
              id="product-keywords"
              className="form-control"
              placeholder="Product's Keywords"
              required
              validateOn="blur"/>
          </div>
          <div className="form-group">
            <label htmlFor="product-available-at">Available At</label>
            <Control.text model="forms.admin.product.available_at"
              component={DateField}
              id="product-available-at"
              className="form-control"
              placeholder="Available At"
              requireds
              validateOn="blur"/>
          </div>
          <div className="form-group">
            <label htmlFor="product-deleted-at">Deleted At</label>
            <Control.text model="forms.admin.product.deleted_at"
              component={DateField}
              id="product-deleted-at"
              className="form-control"
              placeholder="Deleted At"
              required
              validateOn="blur"/>
          </div>
          <div className="form-group">
            <label htmlFor="product-meta-keywords">Meta Keywords</label>
            <Control.text model="forms.admin.product.meta_keywords"
              id="product-meta-keywords"
              className="form-control"
              placeholder="Meta Keywords"
              required
              validateOn="blur"/>
          </div>
          <div className="form-group">
            <label htmlFor="product-meta-description">Meta Description</label>
            <Control.text model="forms.admin.product.meta_description"
              id="product-meta-description"
              className="form-control"
              placeholder="Meta Description"
              required
              validateOn="blur"/>
          </div>
          <input type="submit" value="Submit" className="btn btn-success" />
        </Form>
      </div>
    )
  }
}

export default ProductsForm