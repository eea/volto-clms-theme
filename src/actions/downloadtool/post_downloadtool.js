/**
 * Post cart selection to downloadtool.
 * @module actions/postDownloadtool
 */
export const POST_DOWNLOADTOOL = 'POST_DOWNLOADTOOL';

/**
 * Post cart selection to downloadtool.
 * @function PostDownloadtool
 * @returns {Object} Get extra items action.
 */
export function postDownloadtool(item, unique_ids) {
  return {
    type: POST_DOWNLOADTOOL,
    request: {
      op: 'post',
      data: item,
      path: '/@datarequest_post',
    },
    unique_ids: unique_ids,
  };
}
