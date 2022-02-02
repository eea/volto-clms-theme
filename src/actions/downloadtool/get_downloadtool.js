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
      path: `/@datarequest_search`,
    },
  };
}

/**
 * Get nuts name by id.
 * @module actions/getNutsName
 */
export const GET_NUTSNAME = 'GET_NUTSNAME';

/**
 * Get cart selection to downloadtool.
 * @function getNutsNames
 * @returns {Object} NutsName per NutsId.
 */
export function getNutsNames(nutsids) {
  return {
    type: GET_NUTSNAME,
    request: {
      op: 'get',
      path: `/@nuts_name?nuts_ids=${nutsids}`,
    },
  };
}
