/**
 * Extra breadcrumb items reducer.
 * @module reducers/extraBreadcrumbItemsReducer
 */

import { GET_EXTRA_BREADCRUMB_ITEMS } from '../../actions/extra_breadcrumbs/extra_breadcrumb';

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  items: [],
};

export const extraBreadcrumbItemsReducer = (
  state = initialState,
  action = {},
) => {
  switch (action?.type) {
    case `${GET_EXTRA_BREADCRUMB_ITEMS}_PENDING`:
      return {
        ...state,
        loading: true,
        loaded: false,
        items: action.items,
      };
    case `${GET_EXTRA_BREADCRUMB_ITEMS}_SUCCESS`:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.items,
      };
    case `${GET_EXTRA_BREADCRUMB_ITEMS}_FAIL`:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: true,
        items: action.items,
      };
    default:
      return state;
  }
};
