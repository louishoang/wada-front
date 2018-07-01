import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import OptionTypeForm from './OptionTypeForm';
import OptionTypeTable from './OptionTypeTable';
import OptionTypeDetails from './OptionTypeDetails';
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
          <Route path={`${match.url}/:id`} component={OptionTypeDetails} />
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