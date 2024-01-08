import { importWMSLayersReducer } from './import_wms_layers_reducer';
import { POST_IMPORT_WMS_LAYERS } from '../../actions';

//jest test for importWMSLayersReducer
describe('importWMSLayersReducer', () => {
  it('should return the initial state', () => {
    expect(importWMSLayersReducer(undefined)).toEqual({
      error: null,
      loaded: false,
      loading: false,
      imported_wms_layers: {},
    });
  });
  //jest test for importWMSLayersReducer -success
  it('should handle POST_IMPORT_WMS_LAYERS_SUCCESS', () => {
    const action = {
      type: `${POST_IMPORT_WMS_LAYERS}_SUCCESS`,
      result: { imported_wms_layers: { id: '1' } },
    };
    expect(importWMSLayersReducer({}, action)).toEqual({
      error: null,
      loaded: true,
      loading: false,
      imported_wms_layers: action.result,
    });
  });
  //jest test for importWMSLayersReducer -fail
  it('should handle POST_IMPORT_WMS_LAYERS_FAIL', () => {
    expect(
      importWMSLayersReducer(
        {},
        {
          type: `${POST_IMPORT_WMS_LAYERS}_FAIL`,
          error: 'error',
        },
      ),
    ).toEqual({
      error: 'error',
      loaded: false,
      loading: false,
      imported_wms_layers: {},
    });
  });
  //jest test for importWMSLayersReducer -pending
  it('should handle POST_IMPORT_WMS_LAYERS_PENDING', () => {
    expect(
      importWMSLayersReducer(
        {},
        {
          type: `${POST_IMPORT_WMS_LAYERS}_PENDING`,
        },
      ),
    ).toEqual({
      error: null,
      loaded: false,
      loading: true,
      imported_wms_layers: {},
    });
  });
});
