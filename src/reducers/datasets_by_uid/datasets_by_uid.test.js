import { datasetsByUidReducer } from './datasets_by_uid';
import { DATASETS_BY_UID } from '../../actions';

//jest test for datasetsByUidReducer
describe('datasetsByUidReducer', () => {
  it('should return the initial state', () => {
    expect(datasetsByUidReducer(undefined, {})).toEqual({
      error: null,
      loaded: false,
      loading: false,
      datasets: [],
    });
  });
  //jest test for datasetsByUidReducer -pending
  it('should handle DATASETS_BY_UID_PENDING', () => {
    expect(
      datasetsByUidReducer(
        {},
        {
          type: `${DATASETS_BY_UID}_PENDING`,
        },
      ),
    ).toEqual({
      error: null,
      loaded: false,
      loading: true,
    });
  });
  //jest test for datasetsByUidReducer -fail
  it('should handle DATASETS_BY_UID_FAIL', () => {
    const action = {
      type: `${DATASETS_BY_UID}_FAIL`,
      error: 'error',
    };
    expect(datasetsByUidReducer({}, action)).toEqual({
      error: action.error,
      loaded: false,
      loading: false,
    });
  });
  //jest test for datasetsByUidReducer -success
  it('should handle DATASETS_BY_UID_SUCCESS', () => {
    const action = {
      type: `${DATASETS_BY_UID}_SUCCESS`,
      result: [{}],
    };
    expect(datasetsByUidReducer({}, action)).toEqual({
      error: null,
      loaded: true,
      loading: false,
      datasets: action.result,
    });
  });
});
