import React, { Component } from 'react';
import { Control, Form } from 'react-redux-form';

class Register extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(user) {
    console.log(user);
    return null;
  }

  render() {
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

          <div className="row">
            <div className="col-sm-12">
              <Form model="forms.user"
                className="form-register"
                onSubmit={(user) => this.handleSubmit(user)}>

                <fieldset>
                  <legend>Your Personal Details</legend>
                  <div className="form-group d-md-flex align-items-md-center">
                    <label className="control-label col-md-2" htmlFor="user.firstName">
                      <span className="require">*</span>First Name
                    </label>
                    <div className="col-md-10">
                      <Control.text model="forms.user.firstName"
                        id="forms.users.firstName"
                        className="form-control"
                        placeholder="First Name" />
                    </div>
                  </div>
                  <div className="form-group d-md-flex align-items-md-center">
                    <label className="control-label col-md-2" htmlFor="lastName">
                      <span className="require">*</span>Last Name
                    </label>
                    <div className="col-md-10">
                      <Control.text model="forms.user.lastName"
                        id="l-name"
                        placeholder="Last Name"
                        className="form-control" />
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
                        placeholder="Enter you email address here..." />
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
                        placeholder="Password" />
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
                        placeholder="Confirm password" />
                    </div>
                  </div>
                </fieldset>
                <div className="terms">
                  <div className="float-md-right">
                    <span>I have read and agree to the <a href="#" className="agree"><b>Privacy Policy</b></a></span>
                    <input type="checkbox" name="agree" value="1" /> &nbsp;
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

export default Register