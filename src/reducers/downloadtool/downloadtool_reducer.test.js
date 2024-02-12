import {
  DELETE_DOWNLOADTOOL,
  GET_DOWNLOADTOOL,
  GET_FORMATCONVERSIONTABLE,
  GET_PROJECTIONS,
  POST_DOWNLOADTOOL,
} from '../../actions';
import { downloadtoolReducer } from './downloadtool_reducer';

//jest test to downloadtoolReducer
describe('downloadtoolReducer', () => {
  it('should return the initial state', () => {
    expect(downloadtoolReducer(undefined)).toEqual({
      error: null,
      loaded: false,
      loading: false,
      requested: false,
      download_queued: {},
      download_in_progress: {},
      download_finished_ok: {},
      download_cancelled: {},
      download_finished_nok: {},
      download_rejected: {},
      delete_download_in_progress: {},
      post_download_in_progress: {},
      format_conversion_table_in_progress: {},
      projections_in_progress: {},
      projections_in_progress_uid: {},
    });
  });
  //jest test to GET_DOWNLOADTOOL_SUCCESS
  it('should handle GET_DOWNLOADTOOL_SUCCESS', () => {
    expect(
      downloadtoolReducer(
        {
          error: null,
          loaded: false,
          loading: false,
          requested: false,
          download_queued: {},
          download_in_progress: {},
          download_finished_ok: {
            '1': {
              TaskID: '1',
              TaskName: 'DownloadTool',
              TaskStatus: 'Finished',
              TaskStatusMessage: '',
              TaskStartTime: '2020-04-01T12:00:00.000Z',
              TaskEndTime: '2020-04-01T12:00:00.000Z',
              TaskResult: '',
              TaskResultMessage: '',
            },
          },
          download_finished_nok: {},
          download_rejected: {},
          download_cancelled: {},
          delete_download_in_progress: {},
          post_download_in_progress: {},
          format_conversion_table_in_progress: {},
          projections_in_progress: {},
        },
        {
          type: `${GET_DOWNLOADTOOL}_SUCCESS`,
          result: {
            '1': {
              TaskID: '1',
              TaskName: 'DownloadTool',
              TaskStatus: 'Finished',
              TaskStatusMessage: '',
              TaskStartTime: '2020-04-01T12:00:00.000Z',
              TaskEndTime: '2020-04-01T12:00:00.000Z',
              TaskResult: '',
              TaskResultMessage: '',
            },
          },
        },
      ),
    ).toEqual({
      error: null,
      loaded: true,
      loading: false,
      requested: false,
      download_queued: [],
      download_in_progress: [],
      download_finished_ok: [],
      download_cancelled: [],
      download_finished_nok: [],
      download_rejected: [],
      delete_download_in_progress: {},
      post_download_in_progress: {},
      format_conversion_table_in_progress: {},
      projections_in_progress: {},
      projections_in_progress_uid: {},
    });
  });
  //jest test to downloadtoolReducer -fail
  it('should handle GET_DOWNLOADTOOL_FAIL', () => {
    const action = {
      type: `${GET_DOWNLOADTOOL}_FAIL`,
      error: true,
      loaded: false,
      loading: false,
    };
    expect(downloadtoolReducer({}, action)).toEqual({
      error: true,
      loaded: false,
      loading: false,
    });
  });
  //jest test to downloadtoolReducer -pending
  it('should handle GET_DOWNLOADTOOL_PENDING', () => {
    expect(
      downloadtoolReducer(
        {},
        {
          type: `${GET_DOWNLOADTOOL}_PENDING`,
          error: null,
          loaded: false,
          loading: true,
        },
      ),
    ).toEqual({
      error: null,
      loaded: false,
      loading: true,
    });
  });
  //jest test to POST_DOWNLOADTOOL_SUCCESS
  it('should handle POST_DOWNLOADTOOL_SUCCESS', () => {
    expect(
      downloadtoolReducer(
        {
          error: null,
          loaded: false,
          loading: false,
          requested: false,
          download_queued: {},
          download_in_progress: {},
          download_finished_ok: {},
          download_finished_nok: {},
          download_rejected: {},
          delete_download_in_progress: {},
          post_download_in_progress: {},
          format_conversion_table_in_progress: {},
          projections_in_progress: {},
          projections_in_progress_uid: {},
        },
        {
          type: `${POST_DOWNLOADTOOL}_SUCCESS`,
          result: {
            '1': {
              TaskID: '1',
              TaskName: 'DownloadTool',

              TaskStatus: 'Finished',
              TaskStatusMessage: '',
              TaskStartTime: '2020-04-01T12:00:00.000Z',
              TaskEndTime: '2020-04-01T12:00:00.000Z',
              TaskResult: '',
              TaskResultMessage: '',
            },
          },
        },
      ),
    ).toEqual({
      error: null,
      loaded: true,
      loading: false,
      requested: true,
      download_queued: {},
      download_in_progress: {},
      download_finished_ok: {},
      download_finished_nok: {},
      download_rejected: {},
      delete_download_in_progress: {},
      post_download_in_progress: {},
      format_conversion_table_in_progress: {},
      projections_in_progress: {},
      projections_in_progress_uid: {},
    });
  });
  //jest test to downloadtoolReducer -fail
  it('should handle POST_DOWNLOADTOOL_FAIL', () => {
    const action = {
      type: `${POST_DOWNLOADTOOL}_FAIL`,
      error: true,
      loaded: false,
      loading: false,
    };
    expect(downloadtoolReducer({}, action)).toEqual({
      error: true,
      loaded: false,
      loading: false,
    });
  });
  //jest test to downloadtoolReducer -pending
  it('should handle POST_DOWNLOADTOOL_PENDING', () => {
    expect(
      downloadtoolReducer(
        {},
        {
          type: `${POST_DOWNLOADTOOL}_PENDING`,
          error: null,
          loaded: false,
          loading: true,
        },
      ),
    ).toEqual({
      error: null,
      loaded: false,
      loading: true,
    });
  });
  //jest test to downloadtoolReducer -success
  it('should handle DELETE_DOWNLOADTOOL_SUCCESS', () => {
    expect(
      downloadtoolReducer(
        {},
        {
          type: `${DELETE_DOWNLOADTOOL}_SUCCESS`,
          delete_download_in_progress: true,
        },
      ),
    ).toEqual({
      error: null,
      loaded: true,
      loading: false,
      requested: false,
      delete_download_in_progress: true,
    });
  });
  //jest test to downloadtoolReducer -fail
  it('should handle DELETE_DOWNLOADTOOL_FAIL', () => {
    const action = {
      type: `${DELETE_DOWNLOADTOOL}_FAIL`,
      error: true,
      loaded: false,
      loading: false,
    };
    expect(downloadtoolReducer({}, action)).toEqual({
      error: true,
      loaded: false,
      loading: false,
    });
  });
  //jest test to downloadtoolReducer -pending
  it('should handle DELETE_DOWNLOADTOOL_PENDING', () => {
    expect(
      downloadtoolReducer(
        {},
        {
          type: `${DELETE_DOWNLOADTOOL}_PENDING`,
          error: null,
          loaded: false,
          loading: true,
        },
      ),
    ).toEqual({
      error: null,
      loaded: false,
      loading: true,
    });
  });
  //jest test to downloadtoolReducer -success
  it('should handle GET_FORMATCONVERSIONTABLE_SUCCESS', () => {
    expect(
      downloadtoolReducer(
        {},
        {
          type: `${GET_FORMATCONVERSIONTABLE}_SUCCESS`,
        },
      ),
    ).toEqual({
      error: null,
      loaded: true,
      loading: false,
    });
  });
  //jest test to downloadtoolReducer -fail
  it('should handle GET_FORMATCONVERSIONTABLE_FAIL', () => {
    const action = {
      type: `${GET_FORMATCONVERSIONTABLE}_FAIL`,
      error: true,
      loaded: false,
      loading: false,
    };
    expect(downloadtoolReducer({}, action)).toEqual({
      error: true,
      loaded: false,
      loading: false,
    });
  });
  //jest test to downloadtoolReducer -pending
  it('should handle GET_FORMATCONVERSIONTABLE_PENDING', () => {
    expect(
      downloadtoolReducer(
        {},
        {
          type: `${GET_FORMATCONVERSIONTABLE}_PENDING`,
          error: null,
          loaded: false,
          loading: true,
        },
      ),
    ).toEqual({
      error: null,
      loaded: false,
      loading: true,
    });
  });
  //jest test to GET_PROJECTIONS -success
  it('should handle GET_PROJECTIONS_SUCCESS', () => {
    expect(
      downloadtoolReducer(
        {},
        {
          type: `${GET_PROJECTIONS}_SUCCESS`,
        },
      ),
    ).toEqual({
      error: null,
      loaded: true,
      loading: false,
    });
  });
  //jest test to GET_PROJECTIONS -fail
  it('should handle GET_PROJECTIONS_FAIL', () => {
    const action = {
      type: `${GET_PROJECTIONS}_FAIL`,
      error: true,
      loaded: false,
      loading: false,
    };
    expect(downloadtoolReducer({}, action)).toEqual({
      error: true,
      loaded: false,
      loading: false,
    });
  });
  //jest test to GET_PROJECTIONS -pending
  it('should handle GET_PROJECTIONS_PENDING', () => {
    expect(
      downloadtoolReducer(
        {},
        {
          type: `${GET_PROJECTIONS}_PENDING`,
          error: null,
          loaded: false,
          loading: true,
        },
      ),
    ).toEqual({
      error: null,
      loaded: false,
      loading: true,
    });
  });
});
