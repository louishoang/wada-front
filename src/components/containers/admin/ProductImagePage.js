import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { config as wadaConfig, deleteProductImage } from '../../../api/Wada';
import { postProductImagesRoute } from '../../../api/ApiRouter';
import { SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DragHandle = SortableHandle(() => <i className="fas fa-arrows-alt icon-spr"></i>);

const SortableItem = SortableElement(({value, refreshProductData}) => {
  return (
    <li className="list-group-item sortable-item">
      <div className="row">
        <div className="col-2 flex-center">
          <DragHandle />
        </div>
        <div className="col-8 flex-center">
          <img src={value.url} alt="Product image" />
        </div>
        <div className="col-2 flex-center">
          <Link className="btn btn-sm icon-spr"
            to="#"
            onClick={() => deleteProductImage(value.id).then(()=> refreshProductData())} >
            <i className="fas fa-times icon-red icon-s25"></i>
          </Link>
        </div>
      </div>
    </li>
  )
})

const SortableList = SortableContainer(({items, refreshProductData}) => {
  return (
    <ul className="list-group sortable-list">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} refreshProductData={refreshProductData}/>
      ))}
    </ul>
  );
});

class ProductImagePage extends Component {
  constructor() {
    super()
    this.state = {
      uploadedImages: [],
      previewImages: []
    }
    this.handleDrop = this.handleDrop.bind(this)
  }

  handleDrop(files) {
    const { refreshProductData, product: { permalink } } = this.props
    let images = []

    const uploaders = files.map(file => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("product_id", permalink);
      images.push(file)
      this.setState({ previewImages: images })
      const config = wadaConfig();
      const url = `${config.baseURL}${postProductImagesRoute(permalink).url}`
      const headers = Object.assign(config.headers, { "X-Requested-With": "XMLHttpRequest" })
      return axios.post(url, formData, { headers: headers })
    });

    axios.all(uploaders).then(() => refreshProductData())
  }

  render() {
    const { product, refreshProductData } = this.props

    return (
      <div className="product-image-page">
        <div className="row">
          <div className="col-12 columns">
            <form onSubmit={this.handleSubmit}>
              <div>
                <Dropzone
                  className="dropzone"
                  onDrop={this.handleDrop}
                  multiple
                  accept="image/*">
                  <p className="bgtext">
                    <i className="fas fa-upload icon-spr10 "></i> Drop your files or click here to upload
                  </p>
                  {this.state.previewImages.length > 0 ? <div>
                    <div className="preview">{this.state.previewImages.map((file, index) => <img key={index} src={file.preview} alt="preview failed" />)}</div>
                  </div> : null}              
                </Dropzone>
              </div>
            </form>
          </div>
        </div>

        <div className="row pt-40 pt-sm-40 pl-20">
          <div className="col-12 columns no-paddingl">
            <h3>Product Images</h3>
            <div className="col-8 columns pt-40 pt-sm-40 pl-20 no-paddingl">
              { 
                product && product.images.length > 0 ? (
                  <SortableList items={product.images}
                    useDragHandle={true} 
                    refreshProductData={refreshProductData}/>
                ) : null
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProductImagePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired
}

export default ProductImagePage