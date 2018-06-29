import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import OptionTypeForm from './OptionTypeForm';
import OptionTypeTable from './OptionTypeTable';
import PropTypes from 'prop-types';

class OptionTypePage extends Component {
  constructor() {
    super()
  }

  render() {
    const { match } = this.props
    return (
      <div>
        <Switch>
          <Route exact path={`${match.url}`} component={OptionTypeTable} />
          <Route exact path={`${match.url}/new`} component={OptionTypeForm} />
        </Switch>
      </div>
    )
  }
}

OptionTypePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
}

export default OptionTypePage