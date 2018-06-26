import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminIndex from '../admin/AdminIndex';
import ProductPage from '../admin/ProductPage';
import '../../../assets/css/admin.css';
import SideBar from './SideBar';
import PropTypes from 'prop-types';

class AdminPage extends Component {
  constructor() {
    super()
  }

  render() {
    const { match } = this.props

    return (
      <div className="admin-page">
        <div className="row">
          <div className="col-2 column admin-side-bar bg-faded">
            <SideBar />
          </div>
          <div className="col-10 column pt-40 pt-sm-40 pl-20">
            <div className="container-fluid">
              <Switch>
                <Route exact path={`${match.url}`} component={AdminIndex} />
                <Route path={`${match.url}/products`} component={ProductPage} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AdminPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired
}

export default AdminPage