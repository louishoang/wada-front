import React, { Component } from 'react';
import { actions } from 'react-redux-form';
import { connect } from 'react-redux';
import { getResponseErr } from '../../../utils/ResponseHelpers';
import { callCreateOptionType } from '../../../api/Wada';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import OptForm from '../../presentations/OptionTypes/Form';

class OptionTypeForm extends Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      OptionTypesPageRoute: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    this.props.resetForm()
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
    return (
      <div>
        <h3 className="mb-20">Create An Option Type</h3>
        <OptForm errors={errors} {...this.props} handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

const stateToProps = (state) => ({
  optionType: state.forms.admin.optionType
})

const dispatchToProps = (dispatch) => {
  return {
    submitForm: (promise) => dispatch(actions.submit('createOptionType', promise)),
    resetForm: () => dispatch(actions.reset('forms.admin.optionType'))
  }
}

OptionTypeForm.propTypes = {
  submitForm: PropTypes.func,
  resetForm: PropTypes.func
}

export default connect(stateToProps, dispatchToProps)(OptionTypeForm)