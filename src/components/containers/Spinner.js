import React, { Component } from 'react';
import { connect } from 'react-redux';
import ovalSpinnerImage from '../../assets/img/oval-spinner.svg'
import PropTypes from 'prop-types';

class Spinner extends Component{
  constructor(){
    super()
  }

  render(){
    const { isLoading } = this.props
    return(
      <div id="spinner" className={isLoading ? '' : 'hide'}>
        <img src={ovalSpinnerImage} alt="Loading..."/>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    isLoading: state.isLoading
  }
}

Spinner.propTypes = {
  isLoading: PropTypes.bool.isRequired
}

export default connect(stateToProps)(Spinner)