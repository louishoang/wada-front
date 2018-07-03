import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import PropertiesTable from './PropertiesTable';
import PropertyForm from './PropertyForm';

class PropertiesPage extends Component{
  constructor(){
    super()
  }

  render(){
    const { match } = this.props
    return(
      <Switch>
        <Route exact path={`${match.url}`} component={PropertiesTable} />
        <Route exact path={`${match.url}/new`} component={PropertyForm} />
      </Switch>
    )
  }
}

PropertiesPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
}

export default PropertiesPage