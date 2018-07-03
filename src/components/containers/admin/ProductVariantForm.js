import React, { Component } from 'react';
import { Control, Form, actions } from 'react-redux-form';
import FormError from '../../presentations/FormError';
import { fetchOptionTypes, callCreateVariant } from '../../../api/Wada';
import { connect } from 'react-redux';
import DateField from '../../../utils/DateField';
import { getResponseErr } from '../../../utils/ResponseHelpers';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProductVariantForm extends Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      optionTypes: [],
      productVariantsRoute: null
    }
    this.handleOptionValuesChange = this.handleOptionValuesChange.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { product, setDefaultProductId } = this.props

    if (prevProps.product !== product) {
      this.loadOptionTypes()
      setDefaultProductId(product.id)
    }
  }

  componentDidMount() {
    const { product, setDefaultProductId } = this.props
    this.loadOptionTypes()
    if(product){
      setDefaultProductId(product.id)
    }
  }

  loadOptionTypes() {
    const { product } = this.props

    if (product && product.option_type_ids) {
      fetchOptionTypes({ ids: product.option_type_ids.join(", ") })
        .then(res => this.setState({ optionTypes: res.data }))
    }
  }

  handleSubmit(variant) {
    const { submitForm, match, resetForm } = this.props;

    this.setState({ errors: [] })
    let createVariantPromise = callCreateVariant(variant, 123)
      .then(() => {
        resetForm()
        this.setState({ productVariantsRoute: `/admin/products/${match.params.id}/variants` })
      })
      .catch(err => this.setState({ errors: getResponseErr(err) }))
    submitForm(createVariantPromise)
  }

  handleOptionValuesChange() {
    const elms = document.getElementsByClassName("option-values-select")
    let option_value_ids = []
    for (let i = 0; i < elms.length; i++) {
      const selected = elms[i].options[elms[i].selectedIndex].value
      if (selected !== '') { option_value_ids.push(selected) }
    }
    this.props.dispatch(actions.change('forms.admin.variant.option_value_ids', option_value_ids))
  }

  render() {
    const { errors } = this.props
    const { optionTypes, productVariantsRoute } = this.state

    if (productVariantsRoute) { return <Redirect to={{ pathname: productVariantsRoute }} /> }

    return (
      <div>
        <h3 className="mb-20">Create New Variant</h3>
        <FormError messages={errors} />
        <Form model="forms.admin.variant"
          className="contact-form"
          onSubmit={data => this.handleSubmit(data)}>
          {
            optionTypes.length > 0 ?
              (optionTypes.map((option, idx) => {
                return (
                  <div key={option.id} className="form-group">
                    <label htmlFor={`option-${idx}-name`}>{option.display_name}</label>
                    <select
                      className="form-control option-values-select"
                      onChange={() => this.handleOptionValuesChange()}>
                      <option value=""></option>
                      {option.option_values.map(val => {
                        return (
                          <option key={`${val.id}-${val.name}`} value={val.id}>{val.display_name}</option>
                        )
                      })}
                    </select>
                  </div>
                )
              }))
              : null
          }

          <Control.text hidden model="forms.admin.variant.option_value_ids" />
          <Control.text hidden model="forms.admin.variant.product_id" />

          <div className="form-group">
            <label htmlFor="variant-name">Name</label>
            <Control.text model="forms.admin.variant.name"
              id="variant-name"
              className="form-control"
              placeholder="Variant's name"
              required
              validateOn="blur" />
          </div>
          <div className="form-group">
            <label htmlFor="variant-sku">SKU</label>
            <Control.text model="forms.admin.variant.sku"
              id="variant-sku"
              className="form-control"
              placeholder="SKU"
              required
              validateOn="blur" />
          </div>
          <div className="form-group">
            <label htmlFor="variant-price">Price</label>
            <Control model="forms.admin.variant.price"
              type="number"
              id="variant-price"
              className="form-control"
              placeholder="Price"
              required
              validateOn="blur" />
          </div>
          <div className="form-group">
            <label htmlFor="variant-cost">Cost</label>
            <Control model="forms.admin.variant.cost"
              type="number"
              id="variant-cost"
              className="form-control"
              placeholder="Cost"
              required
              validateOn="blur" />
          </div>
          <div className="form-group">
            <label htmlFor="variant-deleted-at">Deleted At</label>
            <Control.text model="forms.admin.variant.deleted_at"
              component={DateField}
              id="variant-deleted-at"
              className="form-control"
              placeholder="Deleted At"
              required
              validateOn="blur" />
          </div>
          <div className="field">
            <label className="icon-spr">Master Variant</label>
            <Control.checkbox model="forms.admin.variant.master" />
          </div>
          <input type="submit" value="Submit" className="btn btn-success" />
        </Form>
      </div>
    )
  }
}

ProductVariantForm.propTypes = {
  product: PropTypes.shape,
  setDefaultProductId: PropTypes.func,
  resetForm: PropTypes.func,
  submitForm: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func,
  errors: PropTypes.array
}

const stateToProps = (state) => {
  return {
    variant: state.forms.admin.variant
  }
}

const dispatchToProps = (dispatch) => ({
  submitForm: (promise) => dispatch(actions.submit('createVariant', promise)),
  setDefaultProductId: (id) => dispatch(actions.change('forms.admin.variant.product_id', id)),
  resetForm: () => dispatch(actions.reset('forms.admin.variant'))
})

export default connect(stateToProps, dispatchToProps)(ProductVariantForm)