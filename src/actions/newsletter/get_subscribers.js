/**
 * Get subscribers.
 * @module actions/newsletter
 */
export const GET_SUBSCRIBERS = 'GET_SUBSCRIBERS';

/**
 * Get subscribers.
 * @function GetSubscribers
 * @returns {Object} Get extra items action.
 */
export function getSubscribers() {
  return {
    type: GET_SUBSCRIBERS,
    request: {
      op: 'get',
      path: `/@newsletter-subscribers`,
    },
  };
}
