import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormError extends Component {
  componentDidUpdate() {
    if (this.props.messages.length > 0) {
      const element = document.getElementById('wdform-errors');
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  render() {
    const { messages } = this.props
    return (
      <div id="wdform-errors" className={messages.length > 0 ? 'alert alert-danger' : 'hide'}>
        <ul>
          {messages.map((err, id) => <li key={id}>- {err}</li>)}
        </ul>
      </div>
    )
  }
}

FormError.defaultProps = {
  messages: []
}

FormError.propTypes = {
  messages: PropTypes.array.isRequired
}

export default FormError;