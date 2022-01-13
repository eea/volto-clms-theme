/**
 * Post subscribers.
 * @module actions/newsletter
 */
export const POST_SUBSCRIBERS = 'POST_SUBSCRIBERS';
export const POST_UNSUBSCRIBERS = 'POST_UNSUBSCRIBERS';

/**
 * Subscribe to newsletter.
 * @function subscribeNewsletter
 * @returns {Object} Get extra items action.
 */
export function subscribeNewsletter(email) {
  return {
    type: POST_SUBSCRIBERS,
    request: {
      op: 'post',
      path: `/@newsletter-notification-subscribe`,
      data: { email: email },
    },
  };
}

/**
 * Unsubscribe to newsletter.
 * @function unsubscribeNewsletter
 * @returns {Object} Get extra items action.
 */
export function unsubscribeNewsletter(email) {
  return {
    type: POST_UNSUBSCRIBERS,
    request: {
      op: 'post',
      path: `/@newsletter-notification-unsubscribe`,
      data: { email: email },
    },
  };
}

/**
 * Confirm subscribe.
 * @function confirmSubscribe
 * @param {string} key_id key_id.
 * @returns {Object} Get extra items action.
 */
export function confirmSubscribe(key_id) {
  return {
    type: POST_SUBSCRIBERS,
    request: {
      op: 'post',
      path: `/@newsletter-notification-subscribe-confirm/${key_id}`,
    },
  };
}

/**
 * Confirm unsubscribe.
 * @function confirmUnsubscribe
 * @param {string} key_id key_id.
 * @returns {Object} Get extra items action.
 */
export function confirmUnsubscribe(key_id, email) {
  return {
    type: POST_UNSUBSCRIBERS,
    request: {
      op: 'post',
      path: `/@newsletter-notification-unsubscribe-confirm/${key_id}`,
      data: { email: email },
    },
  };
}
