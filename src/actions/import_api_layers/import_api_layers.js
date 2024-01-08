/**
 * Post meeting register actions.
 * @module actions/postImportGeonetwork
 */
export const POST_IMPORT_API_LAYERS = 'POST_IMPORT_API_LAYERS';

/**
 * Post import geonetwork.
 * @function postImportGeonetwork
 * @returns {Object} Get extra items action.
 */
export function postImportAPILayers(url, id, type) {
  return {
    type: POST_IMPORT_API_LAYERS,
    request: {
      op: 'post',
      path: `${url}/@import-api-layers`,
    },
  };
}
