/**
 * Downloadtool reducer.
 * @module reducers/deletedownloadtool
 */

import { DELETE_DOWNLOADTOOL } from '../../actions';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  download_in_progress: {},
};

export const deleteDownloadtoolReducer = (
  state = initialState,
  action = {},
) => {
  switch (action?.type) {
    case `${DELETE_DOWNLOADTOOL}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${DELETE_DOWNLOADTOOL}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };

    case `${DELETE_DOWNLOADTOOL}_SUCCESS`:
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
