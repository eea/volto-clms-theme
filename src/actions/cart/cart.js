/**
 * Cart items actions.
 * @module actions/getCartItems
 */
export const GET_CART_ITEMS = 'GET_CART_ITEMS';
export const SET_CART_ITEMS = 'SET_CART_ITEMS';

/**
 * Set Cart items.
 * @function setCartItems
 * @returns {Object} Set extra items action.
 */
export function setCartItems(items) {
  return {
    type: SET_CART_ITEMS,
    items,
  };
}

/**
 * Get Cart items.
 * @function getCartItems
 * @returns {Object} Get extra items action.
 */
export function getCartItems(token, localStorage) {
  return {
    type: GET_CART_ITEMS,
    token,
    localStorage,
  };
}
