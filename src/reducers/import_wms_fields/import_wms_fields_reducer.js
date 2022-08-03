/**
 * @module reducers/import_wms_fields
 */

import { POST_IMPORT_WMS_FIELDS } from '../../actions';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  imported_wms_fields: {},
};

export const importWMSFieldsReducer = (state = initialState, action = {}) => {
  switch (action?.type) {
    case `${POST_IMPORT_WMS_FIELDS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
        imported_wms_fields: {},
      };
    case `${POST_IMPORT_WMS_FIELDS}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
        imported_wms_fields: {},
      };

    case `${POST_IMPORT_WMS_FIELDS}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        imported_wms_fields: action.result,
      };
    default:
      return state;
  }
};
