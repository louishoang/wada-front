import React from 'react';
import PropTypes from 'prop-types';

const RegisterSuccess = ({confirmationMessage}) => (
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

RegisterSuccess.defaultProps = {
  confirmationMessage: ''
}

RegisterSuccess.propTypes = {
  confirmationMessage: PropTypes.string.isRequired
}

export default RegisterSuccess