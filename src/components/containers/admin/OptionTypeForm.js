import React, { Component } from 'react';
import { Control, Form, actions } from 'react-redux-form';
import { connect } from 'react-redux';
import FormError from '../../presentations/FormError';
import { getResponseErr } from '../../../utils/ResponseHelpers';
import { callCreateOptionType } from '../../../api/Wada';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class OptionTypeForm extends Component{
  constructor() {
    super();
    this.state = {
      errors: [],
      OptionTypesPageRoute: null
    }
  }

  handleSubmit(optionType) {
    const { submitForm } = this.props;
    this.setState({ errors: [] })
    let createOptionTypePromise = callCreateOptionType(optionType)
      .then(() => this.setState({ OptionTypesPageRoute: `/admin/option_types` }))
      .catch(err => this.setState({ errors: getResponseErr(err) }))
    submitForm(createOptionTypePromise)
  }

  render() {
    const { errors, OptionTypesPageRoute } = this.state
    if (OptionTypesPageRoute) { return <Redirect to={{ pathname: OptionTypesPageRoute }} /> }
    return(
      <div>
        <h3 className="mb-20">Create An Option Type</h3>
        <FormError messages={errors} />
        <Form model="forms.admin.optionType"
          className="contact-form"
          onSubmit={(optionType) => this.handleSubmit(optionType)}>
          <div className="form-group">
            <label htmlFor="product-name">Name</label>
            <Control.text model="forms.admin.optionType.name"
              id="option-type-name"
              className="form-control"
              placeholder="Name"
              required
              validateOn="blur" />
          </div>
          <div className="form-group">
            <label htmlFor="product-description">Display Name</label>
            <Control.text model="forms.admin.optionType.display_name"
              id="option-type-display-name"
              className="form-control"
              placeholder="Display Name"
              required
              validateOn="blur"/>
          </div>
          <input type="submit" value="Submit" className="btn btn-success" />
        </Form>
      </div>
    )
  }
}

const stateToProps = (state) => ({
  optionType: state.forms.admin.optionType
})

const dispatchToProps = (dispatch) => {
  return {
    submitForm: (promise) => dispatch(actions.submit('createOptionType', promise))
  }
}

OptionTypeForm.propTypes = {
  submitForm: PropTypes.func
}

export default connect(stateToProps, dispatchToProps)(OptionTypeForm)