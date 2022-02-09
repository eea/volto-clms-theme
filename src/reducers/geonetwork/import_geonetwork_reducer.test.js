import { importGeonetworkReducer } from './import_geonetwork_reducer';
import { POST_IMPORT_GEONETWORK } from '../../actions';

//jest test for importGeonetworkReducer
describe('importGeonetworkReducer', () => {
  it('should return the initial state', () => {
    expect(importGeonetworkReducer(undefined, {})).toEqual({
      error: null,
      loaded: false,
      loading: false,
      imported_data: {},
    });
  });
  //jest test for importGeonetworkReducer -success
  it('should handle POST_IMPORT_GEONETWORK_SUCCESS', () => {
    const action = {
      type: `${POST_IMPORT_GEONETWORK}_SUCCESS`,
      result: '{"imported_data": {"id": "1"}}',
    };
    expect(importGeonetworkReducer({}, action)).toEqual({
      error: null,
      loaded: true,
      loading: false,
      imported_data: JSON.parse(action.result),
    });
  });
  //jest test for importGeonetworkReducer -fail
  it('should handle POST_IMPORT_GEONETWORK_FAIL', () => {
    expect(
      importGeonetworkReducer(
        {},
        {
          type: `${POST_IMPORT_GEONETWORK}_FAIL`,
          error: 'error',
        },
      ),
    ).toEqual({
      error: 'error',
      loaded: false,
      loading: false,
      imported_data: {},
    });
  });
  //jest test for importGeonetworkReducer -pending
  it('should handle POST_IMPORT_GEONETWORK_PENDING', () => {
    expect(
      importGeonetworkReducer(
        {},
        {
          type: `${POST_IMPORT_GEONETWORK}_PENDING`,
        },
      ),
    ).toEqual({
      error: null,
      loaded: false,
      loading: true,
      imported_data: {},
    });
  });
});
