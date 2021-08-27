/**
 * Cart items reducer.
 * @module reducers/cartItemsReducer
 */

import { SET_CART_ITEMS, GET_CART_ITEMS } from '../actions';
import { CART_SESSION_KEY } from '@eeacms/volto-clms-theme/utils/useCartState';

const initialState = {
  items: [],
};

export const cartItemsReducer = (state = initialState, action = {}) => {
  switch (action?.type) {
    case SET_CART_ITEMS:
      return {
        ...state,
        items: action.items,
      };
    case GET_CART_ITEMS:
      return {
        ...state,
        items: JSON.parse(
          localStorage.getItem(CART_SESSION_KEY.concat(action.token)),
        ),
      };
    default:
      return state;
  }
};
