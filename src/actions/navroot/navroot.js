export const GET_NAVROOT = 'GET_NAVROOT';

/**
 * Set sidebar tab function.
 * @function getSite
 * @returns {Object} Get the Navroot information
 */
export function getNavroot(url) {
  return {
    type: GET_NAVROOT,
    request: {
      op: 'get',
      path: `${url}/@navroot`,
    },
  };
}
