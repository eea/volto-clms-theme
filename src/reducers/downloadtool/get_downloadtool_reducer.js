/**
 * Downloadtool reducer.
 * @module reducers/postdownloadtool
 */

import { GET_DOWNLOADTOOL } from '../../actions';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  download_in_progress: {},
};

export const getDownloadtoolReducer = (state = initialState, action = {}) => {
  switch (action?.type) {
    case `${GET_DOWNLOADTOOL}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_DOWNLOADTOOL}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };

    case `${GET_DOWNLOADTOOL}_SUCCESS`:
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
