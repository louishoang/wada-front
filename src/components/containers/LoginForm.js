import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Control, Form, actions, Errors } from 'react-redux-form';
import { callLogin } from '../../api/Wada';
import { getResponseErr } from '../../utils/ResponseHelpers';
import PropTypes from 'prop-types'
import FormError from '../presentations/FormError';
import { setCurrentUser } from '../../actions';
import { Redirect } from 'react-router-dom';

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      errors: [],
      redirectToHomePage: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(user){
    const { submitForm, setCurrentUser } = this.props;
    this.setState({ errors: [] })
    let loginPromise = callLogin(user)
      .then((res) => {
        setCurrentUser(res.data.user)
        localStorage.setItem('accessToken', res.data.user.authentication_token)
        this.setState({ redirectToHomePage: true })
      })
      .catch(err => {
        this.setState({ errors: getResponseErr(err) })
      })
    submitForm(loginPromise)
  }

  render() {
    const { errors, redirectToHomePage } = this.state

    if(redirectToHomePage) { return <Redirect to={{pathname: '/'}}/> }

    return (
      <div className="log-in ptb-100 ptb-sm-60">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="well mb-sm-30">
                <div className="new-customer">
                  <h3 className="custom-title">new customer</h3>
                  <p>By creating an account you will be able to shop faster, be up to date on an order&apos;s status, and keep track of the orders you have previously made</p>
                  <a className="customer-btn" href="/register">Register An Account</a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="well">
                <div className="return-customer">
                  <h3 className="mb-10 custom-title">returning customer</h3>
                  <p className="mb-10"><strong>I am a returning customer</strong></p>
                  <FormError messages={errors}/>
                  <Form model="forms.login"
                    onSubmit={(user) => this.handleSubmit(user)}>
                    <div className="form-group">
                      <label htmlFor="login-email">Email</label>
                      <Control.text model="forms.login.email"
                        id="login-email"
                        className="form-control"
                        placeholder="Email"
                        required
                        validateOn="blur" />

                      <Errors
                        className="errors small form-text"
                        model="forms.login.email"
                        show="touched"
                        messages={{
                          valueMissing: 'Email is required'
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="login-password">Password</label>
                      <Control.text model="forms.login.password"
                        type="password"
                        id="login-password"
                        className="form-control"
                        placeholder="Password"
                        required
                        validateOn="blur" />

                      <Errors
                        className="errors small form-text"
                        model="forms.login.password"
                        show="touched"
                        messages={{
                          valueMissing: 'Password is required'
                        }}
                      />
                    </div>
                    <p className="lost-password"><a href="/forgot-password">Forgot password?</a></p>
                    <input type="submit" value="Login" className="return-customer-btn" />
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    user: state.login
  }
}

const dispatchToProps = (dispatch) => {
  return {
    submitForm: (promise) => dispatch(actions.submit('login', promise)),
    setCurrentUser: (user) => dispatch(setCurrentUser(user))
  }
}

LoginForm.propTypes = {
  submitForm: PropTypes.func,
  setCurrentUser: PropTypes.func
}


export default connect(stateToProps, dispatchToProps)(LoginForm)