/**
 * Get cart selection to downloadtool.
 * @module actions/getDownloadtool
 */
export const GET_DOWNLOADTOOL = 'GET_DOWNLOADTOOL';

/**
 * Get cart selection to downloadtool.
 * @function GetDownloadtool
 * @returns {Object} Get extra items action.
 */
export function getDownloadtool() {
  return {
    type: GET_DOWNLOADTOOL,
    request: {
      op: 'get',
      path: `/@datarequest_search?status=In_progress`,
    },
  };
}
