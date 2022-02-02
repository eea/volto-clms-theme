/**
 * Get cart selection to downloadtool.
 * @module actions/getProjections
 */
export const GET_PROJECTIONS = 'GET_PROJECTIONS';

/**
 * Get cart selection to downloadtool.
 * @function GetProjections
 * @returns {Object} Get extra items action.
 */
export function getProjections() {
  return {
    type: GET_PROJECTIONS,
    request: {
      op: 'get',
      path: '/@projections',
    },
  };
}
