/**
 * Post meeting register actions.
 * @module actions/postMeetingRegister
 */
export const MEETING_SUBSCRIBERS_MANIPULATION =
  'MEETING_SUBSCRIBERS_MANIPULATION';

/**
 * Post meeting register.
 * @function MeetingSubscribersManipulation
 * @returns {Object} Get extra items action.
 */
export function MeetingSubscribersManipulation(
  url,
  subscriberSelection,
  manipulation_type,
) {
  return {
    type: MEETING_SUBSCRIBERS_MANIPULATION,
    request: {
      op: 'post',
      path: `${url}/@manipulation`,
      data: { subscriberSelection, manipulation_type },
    },
  };
}
