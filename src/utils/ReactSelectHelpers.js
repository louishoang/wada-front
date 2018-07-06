import * as constants from '../constants';

export const formatForSelect2 = (item, type) => {
  switch (type) {
  case constants.OPTION_TYPE: {
    const label = `${item.display_name} (${item.name})`
    return { value: item.id, label: label }
  }
  case constants.CATEGORY: {
    const label = item.parent_name !== '' ? `${item.name} - (${item.parent_name})` : item.name
    return { value: item.id, label: label }
  }
  case constants.PRODUCT_PROPERTY: {
    return { value: item.id, label: item.display_name }
  }
  default: { return { value: item.id, label: item.name } }
  }
}

export const selectedValue = (options, selected, type) => {
  const selectedValues = Array.isArray(selected) ? selected : [selected]
  if (options) {
    return options.filter(item => selectedValues.includes(item.id))
      .map(i => formatForSelect2(i, type));
  }
}