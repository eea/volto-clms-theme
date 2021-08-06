/**
 * Cart items reducer.
 * @module reducers/cartItemsReducer
 */

import { GET_CART_ITEMS } from '../actions';

const initialState = {
  items: [],
};

export const cartItemsReducer = (state = initialState, action = {}) => {
  switch (action?.type) {
    case GET_CART_ITEMS:
      return {
        ...state,
        items: action.items,
      };
    default:
      return state;
  }
};
