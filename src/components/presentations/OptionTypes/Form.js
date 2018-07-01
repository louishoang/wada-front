import React, { Component } from 'react';
import FormError from '../../presentations/FormError';
import { Control, Form, actions } from 'react-redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const OptionValueRow = (elm) => {
  return (
    <tr>
      <td scope="col" className="width-100">
        <Control.text model={`forms.admin.optionType.option_values[${elm.idx}].position`}
          id={`option-value-${elm.idx}-position`}
          className="form-control"
          validateOn="blur" />
        <input type="hidden" 
          name={`forms.admin.optionType.option_values[${elm.idx}].id`}
          value={elm.value.id}/>
      </td>
      <td scope="col">
        <Control.text model={`forms.admin.optionType.option_values[${elm.idx}].name`}
          id={`option-value-${elm.idx}-name`}
          className="form-control"
          placeholder="Name"
          validateOn="blur" />
      </td>
      <td scope="col">
        <Control.text model={`forms.admin.optionType.option_values[${elm.idx}].display_name`}
          id={`option-value-${elm.idx}-display-name`}
          className="form-control"
          placeholder="Display Name"
          validateOn="blur" />
      </td>
    </tr>
  )
}

const OptionValueTable = ({ optionType, addNewoptionValue }) => {
  const blankOptionValue = { name: null, display_name: null, position: optionType.option_values.length + 1 }
  const newOptionValues = [...optionType.option_values, blankOptionValue]
  return (
    <div className="row pt-30">
      <div className="container">
        <div className="row">
          <div className="col-8 columns">
            <h3>Option Values</h3>
          </div>
          <div className="col-4 text-right">
            <a href="#"
              onClick={e => addNewoptionValue(e, newOptionValues)} 
              className="btn btn-success">
              <i className="fas fa-plus icon-spr"></i>
              Add New Option Value
            </a>
          </div>
        </div>
        <div className="row pt-10">
          <div className="col-12 columns">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th><label htmlFor="idx">#</label></th>
                  <th><label htmlFor="option-value-name">Name</label></th>
                  <th><label htmlFor="option-value-display-name">Display Name</label></th>
                </tr>
              </thead>
              <tbody>
                {optionType.option_values.map((value, idx) => <OptionValueRow key={idx} value={value} idx={idx}/>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

OptionValueTable.propTypes = {
  optionType: PropTypes.shape({
    position: PropTypes.number,
    name: PropTypes.string,
    display_name: PropTypes.string
  }),
  addNewoptionValue: PropTypes.func
}

class OptForm extends Component {
  constructor() {
    super();
    this.addNewoptionValue = this.addNewoptionValue.bind(this)
  }

  addNewoptionValue(e, data) {
    const { dispatchAddNewOptionValue } = this.props
    e.preventDefault();
    dispatchAddNewOptionValue(data)
  }

  render() {
    const { errors, handleSubmit, optionType, match } = this.props
    return (
      <div>
        <FormError messages={errors} />
        <Form model="forms.admin.optionType"
          className="contact-form"
          onSubmit={(data) => handleSubmit(data)}>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th><label htmlFor="product-name">Name</label></th>
                <th><label htmlFor="product-description">Display Name</label></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="col">
                  <Control.text model="forms.admin.optionType.name"
                    id="option-type-name"
                    className="form-control"
                    placeholder="Name"
                    required
                    validateOn="blur" />
                </td>
                <td scope="col">
                  <Control.text model="forms.admin.optionType.display_name"
                    id="option-type-display-name"
                    className="form-control"
                    placeholder="Display Name"
                    required
                    validateOn="blur" />
                </td>
              </tr>
            </tbody>
          </table>

          {match.path === '/admin/option_types/:id' ?
            <OptionValueTable optionType={optionType} {...this.props} addNewoptionValue={this.addNewoptionValue}/>
            : null
          }

          <div className="pt-20">
            <input type="submit" value="Submit" className="btn btn-success" />
          </div>
        </Form>
      </div>
    )
  }
}

const stateToProps = (state) => ({
  optionType: state.forms.admin.optionType
})

const dispatchToProps = (dispatch) => ({
  dispatchAddNewOptionValue: (values) => dispatch(actions.change('forms.admin.optionType.option_values', values))
})

OptForm.propTypes = {
  handleSubmit: PropTypes.func,
  errors: PropTypes.array,
  dispatchAddNewOptionValue: PropTypes.func,
  optionType: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    display_name: PropTypes.string,
    option_values: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        display_name: PropTypes.string,
        position: PropTypes.number
      })
    )
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired
}


export default connect(stateToProps, dispatchToProps)(OptForm)