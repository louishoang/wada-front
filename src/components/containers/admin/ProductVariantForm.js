import React, { Component } from 'react';
import { Control, Form, actions } from 'react-redux-form';
import FormError from '../../presentations/FormError';
import { fetchOptionTypes, callCreateVariant, callUpdateVariant } from '../../../api/Wada';
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
    const { product, setDefaultProductId, match, resetForm } = this.props

    if (prevProps.product !== product) {
      this.loadOptionTypes()
      setDefaultProductId(product.id) 
      this.populateVariantInfo(product)
    }

    if(!match.params.id) { resetForm() }
  }

  componentDidMount() {
    const { product, setDefaultProductId,match, resetForm } = this.props
    
    this.loadOptionTypes()
    if(product){
      setDefaultProductId(product.id)
      this.populateVariantInfo(product)
    }
    if(!match.params.id) { resetForm() }
  }

  populateVariantInfo(){
    const { match, product, dispatchPopulateVariantInfo } = this.props
    const variantId = match.params.id

    if (!variantId) { return null } // No need to populate variant on create new variant form
    const variant = product.variants.find(v => v.id === parseInt(variantId))

    if(variant){
      dispatchPopulateVariantInfo(variant)
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
    const { submitForm, match, resetForm, product, refreshProductData } = this.props;
    this.setState({ errors: [] })
    let createVariantPromise = (match.params.id ? callUpdateVariant(variant) : callCreateVariant(variant))
      .then(() => {
        resetForm()
        refreshProductData()
        this.setState({ productVariantsRoute: `/admin/products/${product.permalink}/variants` })
      })
      .catch(err => this.setState({ errors: getResponseErr(err) }))
    submitForm(createVariantPromise)
  }

  handleOptionValuesChange() {
    const { dispatchUpdateOptionValueIdsInStore } = this.props
    const elms = document.getElementsByClassName("option-values-select")
    let optionValueIds = []
    for (let i = 0; i < elms.length; i++) {
      const selected = elms[i].options[elms[i].selectedIndex].value
      if (selected !== '') { optionValueIds.push(selected) }
    }
    dispatchUpdateOptionValueIdsInStore(optionValueIds)
  }

  selectedValue(optionName, optionList, optionValueList) {
    let selected = ''
    let newValue = null

    if (!optionValueList || ! optionList) { return '' }

    const elm = document.getElementById(`option-values-select-${optionName}`)
    
    if(elm) { newValue = elm.value }

    Object.entries(optionList).forEach(([key, value]) => {
      if(key === optionName){ 
        selected = optionValueList.find(v => v.display_name ==  value).id
      }
    })

    if ((selected && newValue) || newValue){
      return newValue
    }else{
      return  selected
    }
  }

  render() {
    const { variant, match } = this.props
    const { errors, optionTypes, productVariantsRoute } = this.state

    if (productVariantsRoute) { return <Redirect to={{ pathname: productVariantsRoute }} /> }

    return (
      <div>
        <h3 className="mb-20">
          {match.params.id === undefined ? 'Create New Variant' : 'Update Variant'}
        </h3>
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
                      id={`option-values-select-${option.display_name}`}
                      className="form-control option-values-select"
                      onChange={() => this.handleOptionValuesChange()}
                      value={this.selectedValue(option.display_name, variant.option_list, option.option_values)}>
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
              required />
          </div>
          <div className="form-group">
            <label htmlFor="variant-sku">SKU</label>
            <Control.text model="forms.admin.variant.sku"
              id="variant-sku"
              className="form-control"
              placeholder="SKU"
              required />
          </div>
          <div className="form-group">
            <label htmlFor="variant-price">Price</label>
            <Control model="forms.admin.variant.price"
              type="number"
              id="variant-price"
              className="form-control"
              placeholder="Price"
              required />
          </div>
          <div className="form-group">
            <label htmlFor="variant-cost">Cost</label>
            <Control model="forms.admin.variant.cost"
              type="number"
              id="variant-cost"
              className="form-control"
              placeholder="Cost"
              required />
          </div>
          <div className="form-group">
            <label htmlFor="variant-deleted-at">Deleted At</label>
            <Control.text model="forms.admin.variant.deleted_at"
              component={DateField}
              id="variant-deleted-at"
              className="form-control"
              placeholder="Deleted At"
              required />
          </div>

          <Control.text hidden model="orms.admin.variant.inventory_id" />

          <div className="form-group">
            <label htmlFor="variant-inventory-count-on-hand">Count On Hand</label>
            <Control model="forms.admin.variant.inventory_attributes.count_on_hand"
              type="number"
              id="variant-inventory-count-on-hand"
              className="form-control"
              placeholder="0"
              required />
          </div>

          <div className="form-group">
            <label htmlFor="variant-inventory-vendor-link">Vendor Link</label>
            <Control.textarea model="forms.admin.variant.inventory_attributes.vendor_link"
              id="variant-inventory-vendor-link"
              className="form-control"
              placeholder="http://example.com"
              required
              rows="3" />
          </div>

          <div className="form-group">
            <label htmlFor="variant-inventory-vendor-sku">Vendor SKU</label>
            <Control.text model="forms.admin.variant.inventory_attributes.vendor_sku"
              id="variant-inventory-vendor-sku"
              className="form-control"
              placeholder="SKU"
              required />
          </div>

          <div className="field form-group">
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
  product: PropTypes.object,
  setDefaultProductId: PropTypes.func,
  resetForm: PropTypes.func,
  submitForm: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func,
  errors: PropTypes.array,
  dispatchPopulateVariantInfo: PropTypes.func,
  dispatchUpdateOptionValueIdsInStore: PropTypes.func,
  variant: PropTypes.object,
  refreshProductData: PropTypes.func
}

const stateToProps = (state) => {
  return {
    variant: state.forms.admin.variant
  }
}

const dispatchToProps = (dispatch) => ({
  submitForm: (promise) => dispatch(actions.submit('createVariant', promise)),
  setDefaultProductId: (id) => dispatch(actions.change('forms.admin.variant.product_id', id)),
  resetForm: () => dispatch(actions.reset('forms.admin.variant')),
  dispatchPopulateVariantInfo: (variant) => dispatch(actions.change('forms.admin.variant', variant)),
  dispatchUpdateOptionValueIdsInStore: (optionValueIds) => dispatch(actions.change('forms.admin.variant.option_value_ids', optionValueIds))
})

export default connect(stateToProps, dispatchToProps)(ProductVariantForm)