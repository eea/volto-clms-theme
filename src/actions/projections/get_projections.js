/**
 * Get cart selection to downloadtool.
 * @module actions/getProjections
 */
export const GET_PROJECTIONS = 'GET_PROJECTIONS';
export const GET_PROJECTIONS_UID = 'GET_PROJECTIONS_UID';

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

export function getProjectionsUID(uid) {
  return {
    type: GET_PROJECTIONS_UID,
    uid: uid,
    request: {
      op: 'get',
      path: `/@projections?uid=${uid}`,
    },
  };
}
