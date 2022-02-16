/**
 * Post meeting register actions.
 * @module actions/postImportGeonetwork
 */
export const POST_IMPORT_WMS_LAYERS = 'POST_IMPORT_WMS_LAYERS';

/**
 * Post import geonetwork.
 * @function postImportGeonetwork
 * @returns {Object} Get extra items action.
 */
export function postImportWMSLayers(url, id, type) {
  return {
    type: POST_IMPORT_WMS_LAYERS,
    request: {
      op: 'post',
      path: `${url}/@import-wms-layers`,
    },
  };
}
