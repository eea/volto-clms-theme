/**
 * Profile reducer.
 * @module profile/profile_reducer
 */

import { DELETE_PROFILE } from '../../actions';

const getInitialState = {
  error: null,
  loaded: false,
  loading: false,
  items: [],
};

export const deleteProfileReducer = (state = getInitialState, action = {}) => {
  switch (action.type) {
    case `${DELETE_PROFILE}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${DELETE_PROFILE}_FAIL`:
      return {
        ...state,
        error: true,
        loaded: false,
        loading: false,
      };
    case `${DELETE_PROFILE}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
      };
    default:
      return state;
  }
};
