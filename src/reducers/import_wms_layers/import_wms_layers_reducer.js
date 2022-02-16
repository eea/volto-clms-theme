/**
 * @module reducers/import_wms_layers
 */

import { POST_IMPORT_WMS_LAYERS } from '../../actions';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  imported_wms_layers: {},
};

export const importWMSLayersReducer = (state = initialState, action = {}) => {
  switch (action?.type) {
    case `${POST_IMPORT_WMS_LAYERS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
        imported_wms_layers: {},
      };
    case `${POST_IMPORT_WMS_LAYERS}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
        imported_wms_layers: {},
      };

    case `${POST_IMPORT_WMS_LAYERS}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        imported_wms_layers: action.result,
      };
    default:
      return state;
  }
};
