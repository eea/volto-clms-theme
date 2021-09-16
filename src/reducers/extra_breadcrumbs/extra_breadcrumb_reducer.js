/**
 * Extra breadcrumb items reducer.
 * @module reducers/extraBreadcrumbItemsReducer
 */

import { GET_EXTRA_BREADCRUMB_ITEMS } from '../../actions/extra_breadcrumbs/extra_breadcrumb';

const initialState = {
  items: [],
};

export const extraBreadcrumbItemsReducer = (
  state = initialState,
  action = {},
) => {
  switch (action?.type) {
    case GET_EXTRA_BREADCRUMB_ITEMS:
      return {
        ...state,
        items: action.items,
      };
    default:
      return state;
  }
};
