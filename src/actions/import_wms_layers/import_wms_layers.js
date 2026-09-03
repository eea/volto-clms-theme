/**
 * Import OGC view-service layers action.
 * @module actions/postImportWMSLayers
 */
export const POST_IMPORT_WMS_LAYERS = 'POST_IMPORT_WMS_LAYERS';

/**
 * Request layer import for a dataset.
 * @function postImportWMSLayers
 * @returns {Object} Import layers action.
 */
export function postImportWMSLayers(url) {
  return {
    type: POST_IMPORT_WMS_LAYERS,
    request: {
      op: 'post',
      path: `${url}/@import-wms-layers`,
    },
  };
}
