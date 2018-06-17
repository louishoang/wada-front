import React from "react";
import Datetime from 'react-datetime/DateTime';
require('react-datetime');

const DateField = (props) => {
  return (
    <Datetime
      value={props.value}
      {...props}
      style={{ width: '150%' }} />
  );

};

export default DateField