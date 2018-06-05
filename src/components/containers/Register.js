import React, { Component } from 'react';

class Register extends Component {
  constructor() {
    super()
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
              <form className="form-register" action="#">
                <fieldset>
                  <legend>Your Personal Details</legend>
                  <div className="form-group d-md-flex align-items-md-center">
                    <label className="control-label col-md-2" htmlFor="f-name"><span className="require">*</span>First Name</label>
                    <div className="col-md-10">
                      <input type="text"
                        className="form-control"
                        id="f-name"
                        placeholder="First Name" />
                    </div>
                  </div>
                  <div className="form-group d-md-flex align-items-md-center">
                    <label className="control-label col-md-2" htmlFor="l-name"><span className="require">*</span>Last Name</label>
                    <div className="col-md-10">
                      <input type="text" className="form-control" id="l-name" placeholder="Last Name" />
                    </div>
                  </div>
                  <div className="form-group d-md-flex align-items-md-center">
                    <label className="control-label col-md-2" htmlFor="email"><span className="require">*</span>Enter you email address here...</label>
                    <div className="col-md-10">
                      <input type="email" className="form-control" id="email" placeholder="Enter you email address here..." />
                    </div>
                  </div>
                  <div className="form-group d-md-flex align-items-md-center">
                    <label className="control-label col-md-2" htmlFor="number"><span className="require">*</span>Telephone</label>
                    <div className="col-md-10">
                      <input type="email" className="form-control" id="number" placeholder="Telephone" />
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Your Password</legend>
                  <div className="form-group d-md-flex align-items-md-center">
                    <label className="control-label col-md-2" htmlFor="pwd"><span className="require">*</span>Password:</label>
                    <div className="col-md-10">
                      <input type="password" className="form-control" id="pwd" placeholder="Password" />
                    </div>
                  </div>
                  <div className="form-group d-md-flex align-items-md-center">
                    <label className="control-label col-md-2" htmlFor="pwd-confirm"><span className="require">*</span>Confirm Password</label>
                    <div className="col-md-10">
                      <input type="password" className="form-control" id="pwd-confirm" placeholder="Confirm password" />
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
              </form>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Register