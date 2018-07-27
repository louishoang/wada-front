import {
  ADD_ITEM_TO_SHOPPING_CART,
  REMOVE_ITEM_FROM_SHOPPING_CART,
  UPDATE_CART_ID,
  RESET_CART,
  UPDATE_ALL_ITEMS_IN_CART,
  UPDATE_CART_ITEM_QUANTITY
} from '../constants';

let cart = JSON.parse(localStorage.getItem('cart'));

const initialShoppingCartState = {
  id: null,
  cart_items: [],
  subTotal: 0
}

if (!cart) {
  cart = initialShoppingCartState
}

const CartReducer = (state = cart, action) => {
  const reducer = (accumulator, currentValue) => accumulator + parseFloat(currentValue.price * currentValue.quantity);
  let newCartItems = JSON.parse(JSON.stringify(state.cart_items));
  switch (action.type) {
  case UPDATE_CART_ITEM_QUANTITY: {
    const newItems = state.cart_items.map(i => {
      if(i.id === action.data.itemId){
        return { ...i, quantity: action.data.quantity }
      } else{
        return i
      }
    })
    return{
      ...state,
      cart_items: newItems,
      subTotal: newItems.reduce(reducer, 0).toFixed(2)
    }
  }
  case UPDATE_ALL_ITEMS_IN_CART: {
    return{
      ...state,
      id: action.data.id,
      cart_items: action.data.cart_items,
      subTotal: action.data.cart_items.reduce(reducer, 0).toFixed(2)
    }
  }
  case RESET_CART: {
    return {
      id: action.data.id,
      cart_items: action.data.cart_items,
      subTotal: action.data.subTotal
    }
  }
  case UPDATE_CART_ID: {
    return {
      ...state,
      id: action.id
    }
  }
  case ADD_ITEM_TO_SHOPPING_CART: {
    let currentIds = state.cart_items.map(i => i.variant_id)
    const newItem = action.data.item
    if(currentIds.includes(newItem.variant_id)){
      newCartItems = newCartItems.map(i => {
        if(i.variant_id === newItem.variant_id){
          i.quantity = i.quantity + newItem.quantity
        } 
        return i;
      })
    } else {
      newCartItems = [...state.cart_items, newItem]
    }
    return {
      ...state,
      subTotal: newCartItems.reduce(reducer, 0).toFixed(2),
      cart_items: newCartItems
    }
  }
  case REMOVE_ITEM_FROM_SHOPPING_CART: {
    const newItems = state.cart_items.filter(i => i.id !== action.data.itemId)
    return {
      ...state,
      subTotal: newItems.reduce(reducer, 0).toFixed(2),
      cart_items: newItems
    }
  }
  default:
    return state
  }
}

export default CartReducer