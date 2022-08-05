/**
 * Delete profle.
 * @module actions/newsletter
 */
export const DELETE_PROFILE = 'DELETE_PROFILE';

/**
 * Delete profle.
 * @function delProfile
 * @returns {Object} Get extra items action.
 */
export function delProfile() {
  return {
    type: DELETE_PROFILE,
    request: {
      op: 'del',
      path: `/@delete-user-profile`,
    },
  };
}
