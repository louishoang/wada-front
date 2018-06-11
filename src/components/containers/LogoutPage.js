import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import { PropTypes } from 'prop-types';

class LogoutPage extends Component {
  constructor() {
    super()
    this.state = {
      redirectToHomePage: false
    }
  }

  componentDidMount() {
    this.props.dispatch(logout())
    this.setState({ redirectToHomePage: true })
  }

  render() {
    if (this.state.redirectToHomePage) { <Redirect to="/" /> }
    return null;
  }
}

LogoutPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(LogoutPage)