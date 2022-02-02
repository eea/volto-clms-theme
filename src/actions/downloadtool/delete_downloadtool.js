/**
 * Post cart selection to downloadtool.
 * @module actions/postDownloadtool
 */
export const DELETE_DOWNLOADTOOL = 'DELETE_DOWNLOADTOOL';

/**
 * delete cart selection to downloadtool.
 * @function deleteDownloadtool
 * @returns {Object} Get extra items action.
 */
export function deleteDownloadtool(task_id, user_id) {
  return {
    type: DELETE_DOWNLOADTOOL,
    request: {
      op: 'del',
      data: { TaskID: task_id },
      path: `/@datarequest_delete`,
    },
  };
}
