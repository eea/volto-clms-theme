/**
 * Cart items reducer.
 * @module reducers/cartItemsReducer
 */

import { SET_CART_ITEMS, GET_CART_ITEMS } from '../../actions/cart/cart';
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
      const CART_SESSION_USER_KEY = action.user_id
        ? CART_SESSION_KEY.concat(`_${action.user_id}`)
        : CART_SESSION_KEY;
      return {
        ...state,
        items: JSON.parse(localStorage.getItem(CART_SESSION_USER_KEY)),
      };
    default:
      return state;
  }
};
