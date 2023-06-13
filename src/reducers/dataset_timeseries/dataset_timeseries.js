/**
 * Cart items reducer.
 * @module reducers/dataest_timeseries
 */

import { DATASET_TIMESERIES } from '../../actions';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  datasets: {},
};

export const datasetTimeseriesReducer = (state = initialState, action = {}) => {
  switch (action?.type) {
    case `${DATASET_TIMESERIES}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${DATASET_TIMESERIES}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };

    case `${DATASET_TIMESERIES}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        datasets: { ...state.datasets, [action.uid]: action.result },
      };
    default:
      return state;
  }
};
