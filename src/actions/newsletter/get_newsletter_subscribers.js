/**
 * Get subscribers.
 * @module actions/newsletter
 */
export const GET_NEWSLETTER = 'GET_NEWSLETTER';

/**
 * Get subscribers.
 * @function GetNewsletterSubscriber
 * @returns {Object} Get extra items action.
 */
export function getNewsletterSubscriber() {
  return {
    type: GET_NEWSLETTER,
    request: {
      op: 'get',
      path: `/@newsletter-subscribers`,
    },
  };
}
