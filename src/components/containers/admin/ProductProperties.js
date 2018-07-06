import React, { Component } from 'react'
import FormError from '../../presentations/FormError';
import { connect } from 'react-redux';
import { callGetProductProperties, getProperties, callUpdateProductProperties } from '../../../api/Wada';
import PropTypes from 'prop-types';
import { Control, Form, actions } from 'react-redux-form';
import AsyncSelect from 'react-select/lib/Async';
import * as constants from '../../../constants';
import * as ReactSelectHelpers from '../../../utils/ReactSelectHelpers';
import { getResponseErr } from '../../../utils/ResponseHelpers';

class PropertyRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      propertyOptions: []
    }
    this.filterProperties = this.filterProperties.bind(this)
  }

  filterProperties(inputValue, callback) {
    getProperties()
      .then(res => {
        this.setState({ propertyOptions: res.data })
        let options = res.data.filter(i => {
          return i.identifying_name.toLowerCase().includes(inputValue.toLowerCase()) || i.display_name.toLowerCase().includes(inputValue.toLowerCase())
        }).map(i => ReactSelectHelpers.formatForSelect2(i, constants.PRODUCT_PROPERTY))
        callback(options)
      })
  }

  handleSelectChange(inputValue, idx) {
    this.props.updatePropertyInStore(inputValue.value, idx)
  }

  render() {
    const { propertyOptions } = this.state
    const { value, idx } = this.props

    return (
      <tr>
        <td scope="col" className="width-100">
          <Control.text model={`forms.admin.productProperties.product_properties[${idx}].position`}
            id={`property-${idx}-position`}
            className="form-control"
            validateOn="blur" />
        </td>
        <td scope="col" className="mwidth-200">
          <AsyncSelect
            loadOptions={this.filterProperties}
            defaultOptions
            onChange={input => this.handleSelectChange(input, idx)}
            value={ReactSelectHelpers.selectedValue(propertyOptions, value.property_id, constants.PRODUCT_PROPERTY)}
          />
          <Control.text model={`forms.admin.productProperties.product_properties[${idx}].property_id`} hidden />
        </td>
        <td scope="col">
          <Control.text model={`forms.admin.productProperties.product_properties[${idx}].value`}
            id={`property-${idx}-position`}
            className="form-control"
            validateOn="blur" />
        </td>
      </tr>
    )
  }
}

PropertyRow.propTypes = {
  value: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  updatePropertyInStore: PropTypes.func
}

class ProductProperties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      fetchProperties: true
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchProperties = this.fetchProperties.bind(this)
  }

  componentDidMount() {
    this.fetchProperties()
  }

  componentDidUpdate() {
    this.fetchProperties()
  }

  fetchProperties() {
    const { product, dispatch } = this.props
    const { fetchProperties } = this.state

    if (product && fetchProperties) {
      callGetProductProperties(product.permalink)
        .then(res => {
          dispatch(actions.change('forms.admin.productProperties.product_id', product.id))
          dispatch(actions.change('forms.admin.productProperties.product_properties', res.data))
        }).finally(() => this.setState({ fetchProperties: false }))
    }
  }

  handleSubmit(data) {
    callUpdateProductProperties(data)
      .catch(err => this.setState({ errors: getResponseErr(err) }))
  }

  addNewPropertyValue(e) {
    e.preventDefault()
    const { productProperties, addNewPropertyRow } = this.props
    const newRow = { id: null, value: "", position: productProperties.length + 1, property_id: null, property_name: "" }
    const newList = [...productProperties, newRow]
    addNewPropertyRow(newList)
  }

  render() {
    const { updatePropertyInStore, productProperties, addNewPropertyRow, loading } = this.props
    const { errors } = this.state

    return (
      <div className="row pt-30">
        <div className="container">
          <div className="row">
            <div className="col-8 columns">
              <h3>Properties</h3>
            </div>
            <div className="col-4 text-right">
              <a href="#"
                onClick={e => this.addNewPropertyValue(e)}
                className="btn btn-success">
                <i className="fas fa-plus icon-spr"></i>
                Add New Property
              </a>
            </div>
          </div>
          <div className="row pt-10">
            <div className="container">
              <FormError messages={errors} />
              <Form model="forms.admin.productProperties"
                className="contact-form"
                onSubmit={(data) => this.handleSubmit(data)}>
                <div className="col-12 columns">
                  <table className="table">
                    <thead className="thead-light">
                      <tr>
                        <th><label htmlFor="idx">#</label></th>
                        <th><label htmlFor="property-name">Name</label></th>
                        <th><label htmlFor="property-value">Value</label></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        productProperties.map((value, idx) =>
                          <PropertyRow key={idx}
                            value={value} idx={idx}
                            updatePropertyInStore={updatePropertyInStore}
                            addNewPropertyRow={addNewPropertyRow} />)
                      }
                    </tbody>
                  </table>
                </div>
                <div className="row pt-20">
                  <div className="col-12 columns">
                    <button id="submit-button" type="submit" className="btn btn-success" disabled={loading}>
                      <span id="submit-text">Submit</span>
                      <div className="submit-spinner">
                        <span className="icon-spr">Loading</span>
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                      </div>
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProductProperties.propTypes = {
  product: PropTypes.object,
  updatePropertyInStore: PropTypes.func,
  loading: PropTypes.bool,
  productProperties: PropTypes.arrayOf(PropTypes.object),
  addNewPropertyRow: PropTypes.func,
  dispatch: PropTypes.func
}

const stateToProps = (state) => ({
  productProperties: state.forms.admin.productProperties.product_properties,
  loading: state.isLoading
})

const dispatchToProps = (dispatch) => ({
  updatePropertyInStore: (inputValue, idx) =>
    dispatch(actions.change(`forms.admin.productProperties.product_properties[${idx}].property_id`, inputValue)),
  addNewPropertyRow: (list) => dispatch(actions.change('forms.admin.productProperties.product_properties', list))
})

export default connect(stateToProps, dispatchToProps)(ProductProperties)