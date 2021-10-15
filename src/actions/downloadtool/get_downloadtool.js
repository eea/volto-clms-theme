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
export function getDownloadtool(user_id) {
  return {
    type: GET_DOWNLOADTOOL,
    request: {
      op: 'get',
      path: `/@datarequest_search?UserID=${user_id}&Status=In_progress`,
    },
  };
}
