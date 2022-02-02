/**
 * Newsletter reducer.
 * @module newsletter/newsletter_reducer
 */

import { GET_NEWSLETTER } from '../../actions';

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
    case `${GET_NEWSLETTER}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
        items: [],
      };
    case `${GET_NEWSLETTER}_FAIL`:
      return {
        ...state,
        error: true,
        loaded: false,
        loading: false,
        items: [],
      };
    case `${GET_NEWSLETTER}_SUCCESS`:
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
