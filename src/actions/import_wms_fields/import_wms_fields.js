/**
 * Post meeting register actions.
 * @module actions/postImportGeonetwork
 */
export const POST_IMPORT_WMS_FIELDS = 'POST_IMPORT_WMS_FIELDS';

/**
 * Post import geonetwork.
 * @function postImportWMSFields
 * @returns {Object} Get extra items action.
 */
export function postImportWMSFields(url, id, type) {
  return {
    type: POST_IMPORT_WMS_FIELDS,
    request: {
      op: 'post',
      path: `${url}/@import-wms-fields`,
    },
  };
}
