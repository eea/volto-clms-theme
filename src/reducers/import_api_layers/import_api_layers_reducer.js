/**
 * @module reducers/import_wms_layers
 */

import { POST_IMPORT_API_LAYERS } from '../../actions';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  imported_api_layers: {},
};

export const importAPILayersReducer = (state = initialState, action = {}) => {
  switch (action?.type) {
    case `${POST_IMPORT_API_LAYERS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
        imported_api_layers: {},
      };
    case `${POST_IMPORT_API_LAYERS}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
        imported_api_layers: {},
      };

    case `${POST_IMPORT_API_LAYERS}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        imported_api_layers: action.result,
      };
    default:
      return state;
  }
};
