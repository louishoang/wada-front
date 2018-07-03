import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProperties, callDeleteProperty } from '../../../api/Wada';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

class PropertiesTable extends Component{
  constructor(){
    super()
    this.state = {
      properties: [],
      fetching: true
    }
    this.refreshProperties = this.refreshProperties.bind(this)
  }

  deleteProperty(id) {
    callDeleteProperty(id)
      .then(() => this.refreshProperties())
  }

  componentDidMount(){
    this.refreshProperties()
  }

  refreshProperties(){
    getProperties()
      .then(res => {
        this.setState({ properties: res.data, fetching: false })
      })
  }

  render(){
    const { properties, fetching } = this.state;
    const { match } = this.props

    if(fetching) { return null }

    return(
      <div>
        <div className="row">
          <div className="col-8">
            <h3>Properties</h3>
          </div>
          <div className="col-4">
            <Link className="btn btn-success" 
              to={{pathname: `${match.url}/new`}}>
              <i className="fas fa-plus icon-spr5"></i>
              Create Property
            </Link>
          </div>
          
        </div>
        <div className="row pt-20">
          <ReactTable
            data={properties}
            columns={[
              {
                Header: "Name",
                accessor: "identifying_name"
              },
              {
                Header: "Display Name",
                accessor: "display_name"
              },
              {
                Header: 'ACTIONS',
                Cell: row => {
                  const { id } = row.original
                  return (
                    <div>
                      <Link className="btn btn-primary btn-sm icon-spr"
                        to="#"
                        onClick={() => this.deleteProperty(id)} >
                        <i className="far fa-trash-alt"></i>
                      </Link>
                    </div>
                  )
                }
              }
            ]}
            defaultPageSize={50}
            className="t95-width -striped -highlight"
          />
        </div>
      </div>
    )
  }
}

// PropertiesPage.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       id: PropTypes.node,
//     }).isRequired,
//   }).isRequired,
// }

export default PropertiesTable