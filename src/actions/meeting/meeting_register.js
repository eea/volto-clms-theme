/**
 * Post meeting register actions.
 * @module actions/postMeetingRegister
 */
export const POST_MEETING_REGISTER = 'POST_MEETING_REGISTER';

/**
 * Post meeting register.
 * @function postMeetingRegister
 * @returns {Object} Get extra items action.
 */
export function postMeetingRegister(url) {
  return {
    type: POST_MEETING_REGISTER,
    request: {
      op: 'post',
      path: `${url}/@register`,
    },
  };
}
