/**
 * Get cart selection to downloadtool.
 * @module actions/getDatasetTimeseries
 */
export const DATASET_TIMESERIES = 'DATASET_TIMESERIES';

/**
 * Get cart selection to downloadtool.
 * @function getDatasetTimeseries
 * @returns {Object} Get extra items action.
 */
export function getDatasetTimeseries(uid) {
  return {
    type: DATASET_TIMESERIES,
    uid: uid,
    request: {
      op: 'get',
      path: '/@get-time-series-metadata?dataset=' + uid,
    },
  };
}
