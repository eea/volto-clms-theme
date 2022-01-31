/**
 * Post meeting register actions.
 * @module actions/postImportGeonetwork
 */
export const POST_IMPORT_GEONETWORK = 'POST_IMPORT_GEONETWORK';

/**
 * Post import geonetwork.
 * @function postImportGeonetwork
 * @returns {Object} Get extra items action.
 */
export function postImportGeonetwork(url, id, type) {
  return {
    type: POST_IMPORT_GEONETWORK,
    request: {
      op: 'post',
      data: { id: id, type: type },
      path: `${url}/@import-from-geonetwork`,
    },
  };
}
