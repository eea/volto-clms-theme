/**
 * Newsletter reducer.
 * @module newsletter/newsletter_reducer
 */

import {
  // GET_SUBSCRIBERS,
  POST_SUBSCRIBERS,
  POST_UNSUBSCRIBERS,
} from '../../actions';

const getInitialState = {
  subscribe: {
    error: null,
    loaded: false,
    loading: false,
  },
  unsubscribe: {
    error: null,
    loaded: false,
    loading: false,
  },
};

export const newsletterReducer = (state = getInitialState, action = {}) => {
  switch (action.type) {
    /* case `${GET_SUBSCRIBERS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_SUBSCRIBERS}_FAIL`:
      return {
        ...state,
        error: true,
        loaded: false,
        loading: false,
      };
    case `${GET_SUBSCRIBERS}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
      }; */
    case `${POST_SUBSCRIBERS}_PENDING`:
      return {
        ...state,
        subscribe: {
          ...state.subscribe,
          error: null,
          loaded: false,
          loading: true,
        },
      };
    case `${POST_SUBSCRIBERS}_FAIL`:
      return {
        ...state,
        subscribe: {
          ...state.subscribe,
          error: true,
          loaded: false,
          loading: true,
        },
      };
    case `${POST_SUBSCRIBERS}_SUCCESS`:
      return {
        ...state,
        subscribe: {
          ...state.subscribe,
          error: null,
          loaded: true,
          loading: false,
        },
      };
    case `${POST_UNSUBSCRIBERS}_PENDING`:
      return {
        ...state,
        unsubscribe: {
          ...state.unsubscribe,
          error: null,
          loaded: false,
          loading: true,
        },
      };
    case `${POST_UNSUBSCRIBERS}_FAIL`:
      return {
        ...state,
        unsubscribe: {
          ...state.unsubscribe,
          error: true,
          loaded: false,
          loading: false,
        },
      };
    case `${POST_UNSUBSCRIBERS}_SUCCESS`:
      return {
        ...state,
        unsubscribe: {
          ...state.unsubscribe,
          error: null,
          loaded: true,
          loading: false,
        },
      };
    default:
      return state;
  }
};
