import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import { callProducts, deleteProduct } from '../../../api/Wada';
import { fetchAdminProductsSucceded, adminDeletedProduct } from '../../../actions';
import * as ReactTableHelper from '../../../utils/ReactTableHelper';

const DEFAULT_PAGE_SIZE = 25

const badgeColor = (text) => {
  if (text === 'Active') {
    return 'badge-success'
  } else if (text === 'Deleted') {
    return 'badge-danger'
  } else {
    return 'badge-warning'
  }
}

class ProductsTable extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    }
    this.fetchProducts = this.fetchProducts.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  fetchProducts(state) {
    const { dispatchAdminProductsSucceeded } = this.props
    callProducts(state.pageSize, state.page, state.sortBy, state.order)
      .then(res => {
        this.setState({ loading: false })
        dispatchAdminProductsSucceeded(res.data)
      })
  }

  deleteProduct(e, id) {
    e.preventDefault();
    const { dispatchAdminDeletedProduct } = this.props
    deleteProduct(id).then(() => dispatchAdminDeletedProduct(id))
  }

  render() {
    const { match, products: data } = this.props;
    const { loading } = this.state

    const columns = [{
      Header: 'SKU',
      accessor: 'sku',
      maxWidth: 180
    }, {
      Header: 'NAME',
      accessor: 'name',
      minWidth: 500,
      Cell: row => {
        const { permalink, name } = row.original
        return <Link to={{ pathname: `/admin/products/${permalink}` }}>{name}</Link>
      }
    }, {
      Header: 'STATUS',
      accessor: 'status',
      maxWidth: 150,
      Cell: row => {
        const status = row.original.status
        let klass = badgeColor(status)

        return (
          <span className={`badge ${klass}`}>{status}</span>
        )
      }
    },
    {
      Header: 'MASTER PRICE',
      accessor: 'price',
      maxWidth: 200
    },
    {
      Header: 'ACTIONS',
      Cell: row => {
        const { permalink } = row.original
        return (
          <div>
            <Link className="btn btn-primary btn-sm icon-spr"
              to={`/admin/products/${permalink}`} >
              <i className="fas fa-pencil-alt"></i>
            </Link>
            <Link className="btn btn-primary btn-sm icon-spr"
              to="#"
              onClick={elm => this.deleteProduct(elm, permalink)} >
              <i className="far fa-trash-alt"></i>
            </Link>
          </div>
        )
      }
    }]

    return (
      <div>
        <div className="row">
          <Link to={`${match.url}/new`}
            className="btn btn-success">
            <i className="fas fa-plus icon-spr5"></i>
            Create Product
          </Link>
        </div>
        <div className="row pt-20">
          <ReactTable
            loading={loading}
            manual // Forces table not to paginate or sort automatically, so we can handle it server-side
            data={data}
            pages={ReactTableHelper.pageCount(length, DEFAULT_PAGE_SIZE)}
            columns={columns}
            onFetchData={this.fetchProducts}
            defaultPageSize={DEFAULT_PAGE_SIZE}
            className="t95-width -striped -highlight"
          />
        </div>
      </div>
    )
  }
}

ProductsTable.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  dispatchAdminProductsSucceeded: PropTypes.func.isRequired,
  dispatchAdminDeletedProduct: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    permalink: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string
  }))
}

const stateToProps = (state) => {
  return {
    products: state.admin.products.data
  }
}

const dispatchToProps = (dispatch) => (
  {
    dispatchAdminProductsSucceeded: (products) => dispatch(fetchAdminProductsSucceded(products)),
    dispatchAdminDeletedProduct: (product) => dispatch(adminDeletedProduct(product))
  }
)

export default connect(stateToProps, dispatchToProps)(ProductsTable)