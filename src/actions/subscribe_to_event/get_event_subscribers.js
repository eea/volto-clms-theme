/**
 * Get subscribers.
 * @module actions/event
 */
export const GET_EVENT_SUBSCRIBERS = 'GET_EVENT_SUBSCRIBERS';

/**
 * Get subscribers.
 * @function GetSubscribers
 * @returns {Object} Get extra items action.
 */
export function getSubscribers() {
  return {
    type: GET_EVENT_SUBSCRIBERS,
    request: {
      op: 'get',
      path: `/@event-subscribers`,
    },
  };
}
