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
      datasets: [],
    });
  });
  //jest test for datasetsByUidReducer -fail
  it('should handle DATASETS_BY_UID_FAIL', () => {
    expect(
      datasetsByUidReducer(
        {},
        {
          type: `${DATASETS_BY_UID}_FAIL`,
        },
      ),
    ).toEqual({
      error: true,
      loaded: false,
      loading: false,
      datasets: [],
    });
  });
  //jest test for datasetsByUidReducer -success
  it('should handle DATASETS_BY_UID_SUCCESS', () => {
    expect(
      datasetsByUidReducer(
        {},
        {
          type: `${DATASETS_BY_UID}_SUCCESS`,
          datasets: [
            {
              id: '1',
            },
          ],
        },
      ),
    ).toEqual({
      error: null,
      loaded: true,
      loading: false,
      datasets: [
        {
          id: '1',
        },
      ],
    });
  });
});
