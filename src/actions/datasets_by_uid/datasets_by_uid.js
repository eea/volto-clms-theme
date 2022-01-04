/**
 * Get cart selection to downloadtool.
 * @module actions/getDatasetsByUid
 */
export const DATASETS_BY_UID = 'DATASETS_BY_UID';

/**
 * Get cart selection to downloadtool.
 * @function GetDatasetsByUid
 * @returns {Object} Get extra items action.
 */
export function getDatasetsByUid(uids) {
  return {
    type: DATASETS_BY_UID,
    request: {
      op: 'get',
      path: '/@datasets_by_uid?UID=' + uids,
    },
  };
}
