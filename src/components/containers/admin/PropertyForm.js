import React, { Component } from 'react';
import { Control, Form, actions } from 'react-redux-form';
import FormError from '../../presentations/FormError';
import { callCreateProperty } from '../../../api/Wada';
import { getResponseErr } from '../../../utils/ResponseHelpers';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PropertyForm extends Component{
  constructor(){
    super();
    this.state = {
      errors: [],
      propertiesRoute: null
    }
  }

  handleSubmit(data){
    const { submitForm, resetForm } = this.props;

    this.setState({ errors: [] })
    let createPropertyPromise = callCreateProperty(data)
      .then(() => {
        resetForm()
        this.setState({ propertiesRoute: `/admin/properties` })
      })
      .catch(err => this.setState({ errors: getResponseErr(err) }))
    submitForm(createPropertyPromise)
  }

  render(){
    const { errors, propertiesRoute } = this.state

    if (propertiesRoute) { return <Redirect to={{ pathname: propertiesRoute }} /> }

    return(
      <div>
        <h3 className="mb-20">Create New Property</h3>
        <FormError messages={errors} />
        <Form model="forms.admin.property"
          className="contact-form"
          onSubmit={data => this.handleSubmit(data)}>       
          <div className="form-group">
            <label htmlFor="property-name">Name</label>
            <Control.text model="forms.admin.property.identifying_name"
              id="property-name"
              className="form-control"
              placeholder="Property's name"
              required
              validateOn="blur" />
          </div>
          <div className="form-group">
            <label htmlFor="property-name">Display Name</label>
            <Control.text model="forms.admin.property.display_name"
              id="property-display-name"
              className="form-control"
              placeholder="Property's display name"
              required
              validateOn="blur" />
          </div>
          <input type="submit" value="Submit" className="btn btn-success" />
        </Form>
      </div>
    )
  }
}

const dispatchToProps = (dispatch) => ({
  submitForm: (promise) => dispatch(actions.submit('createProperty', promise)),
  resetForm: () => dispatch(actions.reset('forms.admin.property'))
})

PropertyForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  submitForm: PropTypes.func,
  resetForm: PropTypes.func
}

export default connect(null, dispatchToProps)(PropertyForm)