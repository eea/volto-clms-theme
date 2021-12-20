/**
 * Downloadtool reducer.
 * @module reducers/downloadtool
 */

import {
  DELETE_DOWNLOADTOOL,
  GET_DOWNLOADTOOL,
  GET_FORMATCONVERSIONTABLE,
  GET_PROJECTIONS,
  POST_DOWNLOADTOOL,
} from '../../actions';

const getInitialState = {
  error: null,
  loaded: false,
  loading: false,
  download_in_progress: {},
  delete_download_in_progress: {},
  post_download_in_progress: {},
  format_conversion_table_in_progress: {},
  projections_in_progress: {},
};

export const downloadtoolReducer = (state = getInitialState, action = {}) => {
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
        post_download_in_progress: {
          unique_ids: action.unique_ids,
          task_id: action.result['TaskID'],
        },
      };
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
        delete_download_in_progress: action.result,
      };

    case `${GET_FORMATCONVERSIONTABLE}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };

    case `${GET_FORMATCONVERSIONTABLE}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };

    case `${GET_FORMATCONVERSIONTABLE}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        format_conversion_table_in_progress: action.result,
      };

    case `${GET_PROJECTIONS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };

    case `${GET_PROJECTIONS}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };

    case `${GET_PROJECTIONS}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        projections_in_progress: action.result,
      };

    default:
      return state;
  }
};
