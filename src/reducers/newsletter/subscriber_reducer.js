/**
 * Newsletter reducer.
 * @module newsletter/newsletter_reducer
 */

import { GET_SUBSCRIBERS } from '../../actions';

const getInitialState = {
  error: null,
  loaded: false,
  loading: false,
  items: [],
};

export const newsletterSubscribersReducer = (
  state = getInitialState,
  action = {},
) => {
  switch (action.type) {
    case `${GET_SUBSCRIBERS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
        items: [],
      };
    case `${GET_SUBSCRIBERS}_FAIL`:
      return {
        ...state,
        error: true,
        loaded: false,
        loading: false,
        items: [],
      };
    case `${GET_SUBSCRIBERS}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        items: action.result.subscribers,
      };
    default:
      return state;
  }
};
