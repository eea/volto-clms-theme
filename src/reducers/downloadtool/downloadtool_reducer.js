/**
 * Downloadtool reducer.
 * @module reducers/downloadtool
 */

import { POST_DOWNLOADTOOL } from '../../actions';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  download_in_progress: {},
};

export const downloadtoolReducer = (state = initialState, action = {}) => {
  switch (action?.type) {
    case `${POST_DOWNLOADTOOL}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${POST_DOWNLOADTOOL}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };

    case `${POST_DOWNLOADTOOL}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        download_in_progress: action.result,
      };
    default:
      return state;
  }
};
