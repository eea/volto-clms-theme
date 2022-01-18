/**
 * Newsletter reducer.
 * @module newsletter/newsletter_reducer
 */

import {
  // GET_SUBSCRIBERS,
  POST_SUBSCRIBE_TO_EVENT,
  // POST_UNSUBSCRIBERS,
  // DEL_SUBSCRIBERS,
} from '../../actions';

const getInitialState = {
  error: null,
  loaded: false,
  loading: false,
};

export const subscribeToEventReducer = (
  state = getInitialState,
  action = {},
) => {
  switch (action.type) {
    // case `${GET_SUBSCRIBERS}_PENDING`:
    //   return {
    //     ...state,
    //     error: null,
    //     loaded: false,
    //     loading: true,
    //   };
    // case `${GET_SUBSCRIBERS}_FAIL`:
    //   return {
    //     ...state,
    //     error: true,
    //     loaded: false,
    //     loading: false,
    //   };
    // case `${GET_SUBSCRIBERS}_SUCCESS`:
    //   return {
    //     ...state,
    //     error: null,
    //     loaded: true,
    //     loading: false,
    //     subscribers: action.result,
    //   };
    case `${POST_SUBSCRIBE_TO_EVENT}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${POST_SUBSCRIBE_TO_EVENT}_FAIL`:
      return {
        ...state,
        error: true,
        loaded: false,
        loading: false,
      };
    case `${POST_SUBSCRIBE_TO_EVENT}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
      };
    // case `${POST_UNSUBSCRIBERS}_PENDING`:
    //   return {
    //     ...state,
    //     error: null,
    //     loaded: false,
    //     loading: true,
    //   };
    // case `${POST_UNSUBSCRIBERS}_FAIL`:
    //   return {
    //     ...state,
    //     error: true,
    //     loaded: false,
    //     loading: false,
    //   };
    // case `${POST_UNSUBSCRIBERS}_SUCCESS`:
    //   return {
    //     ...state,
    //     error: null,
    //     loaded: true,
    //     loading: false,
    //   };
    // case `${DEL_SUBSCRIBERS}_PENDING`:
    //   return {
    //     ...state,
    //     error: null,
    //     loaded: false,
    //     loading: true,
    //   };
    // case `${DEL_SUBSCRIBERS}_FAIL`:
    //   return {
    //     ...state,
    //     error: true,
    //     loaded: false,
    //     loading: false,
    //   };
    // case `${DEL_SUBSCRIBERS}_SUCCESS`:
    //   return {
    //     ...state,
    //     error: null,
    //     loaded: true,
    //     loading: false,
    //   };
    default:
      return state;
  }
};
