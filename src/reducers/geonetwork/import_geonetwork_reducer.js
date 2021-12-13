/**
 * Cart items reducer.
 * @module reducers/importGeonetworkReducer
 */

import { POST_IMPORT_GEONETWORK } from '../../actions';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  imported_data: {},
};

export const importGeonetworkReducer = (state = initialState, action = {}) => {
  switch (action?.type) {
    case `${POST_IMPORT_GEONETWORK}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
        imported_data: {},
      };
    case `${POST_IMPORT_GEONETWORK}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
        imported_data: {},
      };

    case `${POST_IMPORT_GEONETWORK}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        imported_data: JSON.parse(action.result),
      };
    default:
      return state;
  }
};
