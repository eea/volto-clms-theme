/**
 * user schame reducer.
 * @module reducers/userschema
 */

import { GET_USERSCHEMA } from '../../constants/ActionTypes';

const getInitialState = {
  error: null,
  loaded: false,
  loading: false,
  userschema: {
    fieldsets: [],
    properties: {},
    required: [],
    type: undefined,
  },
};

export const userschemaReducer = (state = getInitialState, action) => {
  switch (action?.type) {
    case `${GET_USERSCHEMA}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_USERSCHEMA}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };
    case `${GET_USERSCHEMA}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        userschema: action.result,
      };

    default:
      return state;
  }
};
