/**
 * Cart items actions.
 * @module actions/getCartItems
 */
export const GET_CART_ITEMS = 'GET_CART_ITEMS';

/**
 * Get Cart items.
 * @function getCartItems
 * @returns {Object} Get extra items action.
 */
export function getCartItems(items) {
  return {
    type: GET_CART_ITEMS,
    items,
  };
}
