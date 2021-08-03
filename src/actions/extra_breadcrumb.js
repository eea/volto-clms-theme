/**
 * Extra Breadcrumb items actions.
 * @module actions/getExtraBreadcrumbItems
 */
export const GET_EXTRA_BREADCRUMB_ITEMS = 'GET_EXTRA_BREADCRUMB_ITEMS';

/**
 * Get Extra Breadcrumb items.
 * @function getExtraBreadcrumbItems
 * @returns {Object} Get extra items action.
 */
export function getExtraBreadcrumbItems(items) {
  return {
    type: GET_EXTRA_BREADCRUMB_ITEMS,
    items,
  };
}
