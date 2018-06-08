import React from 'react';
import PropTypes from 'prop-types'

const FormError = ({ messages }) => (
  <div className={messages.length > 0 ? 'alert alert-danger' : 'hide'}>
    <ul>
      {messages.map((err, id) => <li key={id}>- {err}</li>)}
    </ul>
  </div>
)

FormError.defaultProps = {
  messages: []
}

FormError.propTypes = {
  messages: PropTypes.array.isRequired
}

export default FormError;