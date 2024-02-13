/**
 * Downloadtool reducer.
 * @module reducers/downloadtool
 */

import {
  DELETE_DOWNLOADTOOL,
  GET_DOWNLOADTOOL,
  GET_FORMATCONVERSIONTABLE,
  GET_PROJECTIONS,
  GET_PROJECTIONS_UID,
  POST_DOWNLOADTOOL,
} from '../../actions';

const getInitialState = {
  error: null,
  loaded: false,
  loading: false,
  requested: false,
  download_queued: {},
  download_in_progress: {},
  download_finished_ok: {},
  download_finished_nok: {},
  download_rejected: {},
  download_cancelled: {},
  delete_download_in_progress: {},
  post_download_in_progress: {},
  format_conversion_table_in_progress: {},
  projections_in_progress: {},
  projections_in_progress_uid: {},
};

export const downloadtoolReducer = (state = getInitialState, action = {}) => {
  switch (action?.type) {
    case `${GET_DOWNLOADTOOL}_PENDING`:
    case `${POST_DOWNLOADTOOL}_PENDING`:
    case `${DELETE_DOWNLOADTOOL}_PENDING`:
    case `${GET_FORMATCONVERSIONTABLE}_PENDING`:
    case `${GET_PROJECTIONS}_PENDING`:
    case `${GET_PROJECTIONS_UID}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_DOWNLOADTOOL}_FAIL`:
    case `${POST_DOWNLOADTOOL}_FAIL`:
    case `${DELETE_DOWNLOADTOOL}_FAIL`:
    case `${GET_FORMATCONVERSIONTABLE}_FAIL`:
    case `${GET_PROJECTIONS}_FAIL`:
    case `${GET_PROJECTIONS_UID}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };

    case `${GET_DOWNLOADTOOL}_SUCCESS`:
      let tasks_keys = Object.keys(action.result);
      let tasks_array = [];
      tasks_keys.forEach((progress_key) => {
        tasks_array.push({
          ...action.result[progress_key],
          TaskID: progress_key,
        });
      });
      var queued = tasks_array.filter((task) => task.Status === 'Queued');
      var in_progress = tasks_array.filter(
        (task) => task.Status === 'In_progress',
      );
      var finished_ok = tasks_array.filter(
        (task) => task.Status === 'Finished_ok',
      );
      var finished_nok = tasks_array.filter(
        (task) => task.Status === 'Finished_nok',
      );
      var rejected = tasks_array.filter((task) => task.Status === 'Rejected');
      var cancelled = tasks_array.filter((task) => task.Status === 'Cancelled');
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        requested: false,
        download_queued: queued,
        download_in_progress: in_progress,
        download_finished_ok: finished_ok,
        download_finished_nok: finished_nok,
        download_rejected: rejected,
        download_cancelled: cancelled,
      };
    case `${POST_DOWNLOADTOOL}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        requested: true,
        post_download_in_progress: {
          unique_ids: action.unique_ids,
          task_id: action.result['TaskID'],
        },
      };
    case `${DELETE_DOWNLOADTOOL}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        delete_download_in_progress: true,
        requested: false,
      };
    case `${GET_FORMATCONVERSIONTABLE}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        format_conversion_table_in_progress: action.result,
      };
    case `${GET_PROJECTIONS}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        projections_in_progress: action.result,
      };
    case `${GET_PROJECTIONS_UID}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        projections_in_progress_uid: {
          ...state.projections_in_progress_uid,
          [action.uid]: action.result,
        },
      };

    default:
      return state;
  }
};
