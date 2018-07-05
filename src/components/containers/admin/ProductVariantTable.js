import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SortableList } from '../../presentations/sortable/SortableList';
import { connect } from 'react-redux';

const CreateOptionTypeWarning = ({ productId }) => (
  <div>
    Please create <Link to={{ pathname: `/admin/products/${productId}` }} >Option Types</Link> before adding a variant
  </div>
)

CreateOptionTypeWarning.propTypes = {
  productId: PropTypes.string.isRequired,
}

class ProductVariantTable extends Component {
  constructor() {
    super()
  }

  componentDidMount(){
    this.props.refreshProductData()
  }

  render() {
    const { match, product, refreshProductData} = this.props

    if (product && product.option_type_ids.length === 0) {
      return (<CreateOptionTypeWarning productId={product.permalink} />)
    }

    return (
      <div>
        <div className="row">
          <Link to={{pathname: `${match.url}/variants/new`}}
            className="btn btn-success">
            <i className="fas fa-plus icon-spr5"></i>
              Add New Variant
          </Link>
        </div>
        <div className="row pt-20 pt-sm-20 pl-20">
          <div className="col-12 columns no-paddingl">
            <h3>Variants</h3>
            <div className="col-12 columns pt-40 pt-sm-40 pl-20 no-paddingl">
              { 
                product && product.variants.length > 0 ? (
                  <SortableList items={product.variants}
                    modelTypes="variant"
                    useDragHandle={true} 
                    refreshProductData={refreshProductData}/>
                // TODO: Need to send images position to the back-end after sorted
                ) : null
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProductVariantTable.propTypes = {
  refreshProductData: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  product: PropTypes.object
}

export default connect(null, null)(ProductVariantTable)
