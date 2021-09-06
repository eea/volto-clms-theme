/**
 * Post meeting register actions.
 * @module actions/postMeetingRegister
 */
export const MEETING_SUBSCRIBERS = 'MEETING_SUBSCRIBERS';

/**
 * Post meeting register.
 * @function MeetingSubscribers
 * @returns {Object} Get extra items action.
 */
export function MeetingSubscribers(url) {
  return {
    type: MEETING_SUBSCRIBERS,
    request: {
      op: 'get',
      path: `${url}/@search?portal_type=eea.meeting.subscriber&fullobjects=true`,
    },
  };
}
