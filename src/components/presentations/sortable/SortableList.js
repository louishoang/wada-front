import React from 'react';
import { SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import { Link } from 'react-router-dom';
import { deleteProductImage, deleteProductVariant } from '../../../api/Wada';

const DragHandle = SortableHandle(() => <i className="fas fa-arrows-alt icon-spr"></i>);

const SortableVariant = SortableElement(({ value, refreshProductData }) => {
  return (
    <li className="list-group-item sortable-item">
      <div className="row">
        <div className="col-1 flex-center">
          <DragHandle />
        </div>
        <div className="col-2 flex-center">
          {value.sku}
        </div>
        <div className="col-4 flex-center">
          {value.name} - ({value.option_value_names})
        </div>
        <div className="col-2 flex-center">
          {value.price}
        </div>
        <div className="col-1 flex-center">
          {value.master ? 'Master' : ''}
        </div>
        <div className="col-2 flex-center">
          <Link className="btn btn-sm icon-spr"
            to="#"
            onClick={() => deleteProductVariant(value.id).then(() => refreshProductData())} >
            <i className="fas fa-times icon-red icon-s25"></i>
          </Link>
        </div>
      </div>
    </li>
  )
})

const SortableImage = SortableElement(({ value, refreshProductData }) => {
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
            onClick={() => deleteProductImage(value.id).then(() => refreshProductData())} >
            <i className="fas fa-times icon-red icon-s25"></i>
          </Link>
        </div>
      </div>
    </li>
  )
})

const components = {
  variant: SortableVariant,
  productImage: SortableImage
};

export const SortableList = SortableContainer(({ items, refreshProductData, modelTypes }) => {
  let SortableItemComponent = components[modelTypes]

  return (
    <ul className="list-group sortable-list">
      {items.map((value, index) => (
        <SortableItemComponent key={`item-${index}`} 
          index={index} 
          value={value} 
          refreshProductData={refreshProductData} />
      ))}
    </ul>
  );
});



