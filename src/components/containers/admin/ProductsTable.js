import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductsTable = ({match}) => (
  <div>
    <div className="row">
      <Link to={`${match.url}/new`}
        className="btn btn-success">Create Product</Link>
    </div>
    Product List
  </div>
)

ProductsTable.propTypes = {
  match: PropTypes.shape
}

export default ProductsTable