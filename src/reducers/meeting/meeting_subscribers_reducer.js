/**
 * Cart items reducer.
 * @module reducers/cartItemsReducer
 */

import {
  MEETING_SUBSCRIBERS,
  MEETING_SUBSCRIBERS_MANIPULATION,
} from '../../actions';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  items: [],
  message: '',
};

export const meetingSubscribersReducer = (
  state = initialState,
  action = {},
) => {
  switch (action?.type) {
    case `${MEETING_SUBSCRIBERS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
        message: '',
      };
    case `${MEETING_SUBSCRIBERS}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
        message: '',
      };

    case `${MEETING_SUBSCRIBERS}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        items: action.result.items,
        message: '',
      };
    case `${MEETING_SUBSCRIBERS_MANIPULATION}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${MEETING_SUBSCRIBERS_MANIPULATION}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
        message: action.result.message,
      };

    case `${MEETING_SUBSCRIBERS_MANIPULATION}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        message: action.result.message,
        items: action.result.items,
      };
    default:
      return state;
  }
};
