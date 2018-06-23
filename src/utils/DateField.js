import React from "react";
import Datetime from 'react-datetime/DateTime';
require('react-datetime');
import PropTypes from 'prop-types';

const DateField = (props) => {
  return (
    <Datetime
      value={props.value}
      {...props}
      style={{ width: '150%' }} />
  );
};

DateField.propTypes = {
  value: PropTypes.string
}


export default DateField