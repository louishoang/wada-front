import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Control, Form, actions, Errors } from 'react-redux-form';
import { registerUser } from '../../api/Wada';
import { requestStarted, requestSucceeded, requestFailed } from '../../actions'
import * as validators from '../../utils/validators'
import PropTypes from 'prop-types';

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      registered: false,
      confirmationMessage: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(user) {
    const { submitForm, requestStarted, requestSucceeded, requestFailed } = this.props;
    this.setState({ errors: [] })
    requestStarted()
    let registerPromise = registerUser(user)
      .then((res) => {
        requestSucceeded()
        this.setState({ registered: true, confirmationMessage: res.data.message })
      })
      .catch(err => {
        requestFailed()
        let errors;
        if (err.response.status) {
          errors = err.response.data.error_message.split(/\\n/)
        } else {
          errors = ['Something is wrong, please try again later.']
        }
        this.setState({ errors })
      })
    submitForm(registerPromise);
  }

  render() {
    const { errors, registered, confirmationMessage } = this.state;

    if (registered) {
      return (
        <div className="register-account ptb-100 ptb-sm-60">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="register-title">
                  <h3 className="mb-10">Your Account Been Created!</h3>
                  <p className="mb-10">
                    {confirmationMessage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="register-account ptb-100 ptb-sm-60">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="register-title">
                <h3 className="mb-10">REGISTER ACCOUNT</h3>
                <p className="mb-10">If you already have an account with us, please login at the login page.</p>
              </div>
            </div>
          </div>

          <div className={errors.length > 0 ? 'alert alert-danger' : 'hide'}>
            <ul>
              {errors.map((err, id) => <li key={id}>- {err}</li>)}
            </ul>
          </div>

          <div className="row">

            <div className="col-sm-12">
              <Form model="forms.user"
                className="form-register"
                onSubmit={(user) => this.handleSubmit(user)}
                validators={{
                  '': {
                    passwordsMatch: (vals) => vals.password === vals.password_confirmation,
                  }
                }}>

                <fieldset>
                  <legend>Your Personal Details</legend>
                  <div className="form-group d-md-flex align-items-md-center">
                    <label className="control-label col-md-2" htmlFor="first_name">
                      <span className="require">*</span>First Name
                    </label>
                    <div className="col-md-10">
                      <Control.text model="forms.user.first_name"
                        id="first_name"
                        className="form-control"
                        placeholder="First Name"
                        required
                        validators={{
                          length: (val) => validators.validLength(val)
                        }}
                        validateOn="blur" />

                      <Errors
                        className="errors small form-text"
                        model="forms.user.first_name"
                        show="touched"
                        messages={{
                          valueMissing: 'First Name is required',
                          length: 'Must be between 2 and 40 characters'
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group d-md-flex align-items-md-center">
                    <label className="control-label col-md-2" htmlFor="last_name">
                      <span className="require">*</span>Last Name
                    </label>
                    <div className="col-md-10">
                      <Control.text model="forms.user.last_name"
                        id="last-name"
                        placeholder="Last Name"
                        className="form-control"
                        required
                        validators={{
                          length: (val) => validators.validLength(val)
                        }}
                        validateOn="blur" />
                      <Errors
                        className="errors small form-text"
                        model="forms.user.last_name"
                        show="touched"
                        messages={{
                          valueMissing: 'Last Name is required',
                          length: 'Must be between 2 and 40 characters'
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group d-md-flex align-items-md-center">
                    <label className="control-label col-md-2" htmlFor="email">
                      <span className="require">*</span>Email
                    </label>
                    <div className="col-md-10">
                      <Control.text model="forms.user.email"
                        className="form-control"
                        id="email"
                        placeholder="Enter you email address here..."
                        required
                        validators={{
                          validEmail: (val) => validators.validEmail(val)
                        }}
                        validateOn="blur" />
                      <Errors
                        className="errors small form-text"
                        model="forms.user.email"
                        show="touched"
                        messages={{
                          valueMissing: 'Email is required',
                          validEmail: 'Please enter a valid email'
                        }}
                      />
                    </div>
                  </div>
                  {/* <div className="form-group d-md-flex align-items-md-center">
                    <label className="control-label col-md-2" htmlFor="number">
                      <span className="require">*</span>Telephone
                    </label>
                    <div className="col-md-10">
                      <input type="email" className="form-control" id="number" placeholder="Telephone" />
                    </div>
                  </div> */}
                </fieldset>
                <fieldset>
                  <legend>Your Password</legend>
                  <div className="form-group d-md-flex align-items-md-center">
                    <label className="control-label col-md-2" htmlFor="password">
                      <span className="require">*</span>Password:
                    </label>
                    <div className="col-md-10">
                      <Control model="forms.user.password"
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        required />

                      <Errors
                        className="errors small form-text"
                        model="forms.user.password"
                        show="touched"
                        messages={{
                          valueMissing: 'Password is required',
                          validPassword: 'Must be more than 8 characters'
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group d-md-flex align-items-md-center">
                    <label className="control-label col-md-2" htmlFor="passwordConfirmation">
                      <span className="require">*</span>Confirm Password
                    </label>
                    <div className="col-md-10">
                      <Control model="forms.user.password_confirmation"
                        type="password"
                        className="form-control"
                        id="passwordConfirmation"
                        placeholder="Confirm password"
                        required />
                      <Errors
                        className="errors small form-text"
                        model="forms.user"
                        show="touched"
                        messages={{
                          passwordsMatch: "Password doesn't match confirm password"
                        }}/>
                    </div>
                  </div>
                </fieldset>
                <div className="row" id="agree-to-term">
                  <span>
                    By creating an account, you are agreeing to the terms & conditions and privacy policy, including receipt of exclusive email offers and promotions.
                  </span>
                </div>
                <div className="terms">
                  <div className="float-md-right">
                    <input type="submit" value="Continue" className="return-customer-btn" />
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

const stateToProps = (state) => {
  return {
    user: state.user
  }
}

const dispatchToProps = (dispatch) => {
  return {
    requestStarted: () => dispatch(requestStarted()),
    requestSucceeded: () => dispatch(requestSucceeded()),
    requestFailed: () => dispatch(requestFailed()),
    submitForm: (promise) => dispatch(actions.submit('user', promise))
  }
}

RegisterForm.propTypes = {
  requestStarted: PropTypes.func,
  requestSucceeded: PropTypes.func,
  requestFailed: PropTypes.func,
  submitForm: PropTypes.func
}

export default connect(stateToProps, dispatchToProps)(RegisterForm);