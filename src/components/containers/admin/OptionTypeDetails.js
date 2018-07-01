import React, { Component } from 'react';
import { actions } from 'react-redux-form';
import OptForm from '../../presentations/OptionTypes/Form';
import { getOptionTypeDetails, callUpdateOptionType } from '../../../api/Wada';
import { connect }  from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class OptionTypeDetails extends Component{
  constructor(){
    super();
    this.state = {
      errors: [],
      redirectToOptionTypesTable: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    const { match, dispatch } = this.props
    getOptionTypeDetails(match.params.id)
      .then(res => dispatch(actions.change('forms.admin.optionType', res.data)))
  }

  handleSubmit(optionType){
    callUpdateOptionType(optionType)
      .then(() => this.setState({ redirectToOptionTypesTable: '/admin/option_types' }))
  }

  render(){
    const { errors, redirectToOptionTypesTable } = this.state

    if (redirectToOptionTypesTable) { return (<Redirect to={{pathname: redirectToOptionTypesTable}} />)}

    return(
      <div>
        <OptForm errors={errors} {...this.props} handleSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

OptionTypeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired
}


const stateToProps = (state) => ({
  optionType: state.forms.admin.optionType
})

export default connect(stateToProps, null)(OptionTypeDetails)