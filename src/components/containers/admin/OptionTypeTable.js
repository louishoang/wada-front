import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import { getOptiontypes } from '../../../api/Wada';
import { Link } from 'react-router-dom';
import { getAdminOptionTypesSucceeded } from '../../../actions';
import * as ReactTableHelper from '../../../utils/ReactTableHelper';
import PropTypes from 'prop-types';

const DEFAULT_PAGE_SIZE = 25

class OptionTypeTable extends Component{
  constructor(){
    super();
    this.state = {
      loading: true
    }
    this.fetchOptionTypes = this.fetchOptionTypes.bind(this)
  }

  fetchOptionTypes(state) {
    const { dispatchAdminOptionTypesSucceeded } = this.props
    getOptiontypes(state.pageSize, state.page, state.sortBy, state.order)
      .then(res => {
        this.setState({ loading: false })
        dispatchAdminOptionTypesSucceeded(res.data)}
      )
  }

  render(){
    const { match, optionTypes: data } = this.props
    const { loading } = this.state

    const columns = [{
      Header: 'NAME',
      accessor: 'name',
      Cell: row => {
        const { id, name } = row.original
        return <Link to={{ pathname: `/admin/option_types/${id}` }}>{name}</Link>
      }
    },
    {
      Header: 'DISPLAY NAME',
      accessor: 'display_name'
    }]

    return(
      <div>
        <div className="row">
          <Link to={`${match.url}/new`}
            className="btn btn-success">
            <i className="fas fa-plus icon-spr5"></i>
            Create Option Type
          </Link>
        </div>
        <div className="row pt-20">
          <ReactTable
            loading={loading}
            manual // Forces table not to paginate or sort automatically, so we can handle it server-side
            data={data}
            pages={ReactTableHelper.pageCount(length, DEFAULT_PAGE_SIZE)}
            columns={columns}
            onFetchData={this.fetchOptionTypes}
            defaultPageSize={DEFAULT_PAGE_SIZE}
            className="t95-width -striped -highlight"
          />
        </div>
      </div>
    )
  }
}

OptionTypeTable.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  dispatchAdminOptionTypesSucceeded: PropTypes.func.isRequired,
  optionTypes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    display_name: PropTypes.string
  }))
}


const stateToProps = (state) => {
  return {
    optionTypes: state.admin.optionTypes.data
  }
}

const dispatchToProps = (dispatch) => (
  {
    dispatchAdminOptionTypesSucceeded: (optionTypes) => dispatch(getAdminOptionTypesSucceeded(optionTypes))
  }
)

export default connect(stateToProps, dispatchToProps)(OptionTypeTable)