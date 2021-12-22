/**
 * Cart items reducer.
 * @module reducers/datasets_by_uid
 */

import { DATASETS_BY_UID } from '../../actions';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  datasets: [],
};

export const datasetsByUidReducer = (state = initialState, action = {}) => {
  switch (action?.type) {
    case `${DATASETS_BY_UID}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${DATASETS_BY_UID}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };

    case `${DATASETS_BY_UID}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        datasets: action.result,
      };
    default:
      return state;
  }
};
