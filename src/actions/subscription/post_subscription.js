/**
 * Post subscribers.
 * @module actions/event
 */
export const POST_SUBSCRIBE_TO = 'POST_SUBSCRIBE_TO';

/**
 * Subscribe to event.
 * @function subscribe
 * @param {string} type_url type_url.
 * @param {string} email email.
 * @returns {Object} Get extra items action.
 */
export function subscribeTo(type_url, email) {
  return {
    type: POST_SUBSCRIBE_TO,
    request: {
      op: 'post',
      path: `/@${type_url}-notification-subscribe`,
      data: { email: email },
    },
  };
}

/**
 * Unsubscribe to event.
 * @function unsubscribe
 * @param {string} type type.
 * @param {string} email email.
 * @returns {Object} Get extra items action.
 */
export function unsubscribeTo(type_url, email) {
  return {
    type: POST_SUBSCRIBE_TO,
    request: {
      op: 'post',
      path: `/@${type_url}-notification-unsubscribe`,
      data: { email: email },
    },
  };
}

/**
 * Confirm subscribe.
 * @function confirmSubscribe
 * @param {string} type_url type_url.
 * @param {string} id id.
 * @returns {Object} Get extra items action.
 */
export function confirmSubscribeTo(type_url, id) {
  return {
    type: POST_SUBSCRIBE_TO,
    request: {
      op: 'post',
      path: `/@${type_url}-notification-subscribe-confirm/${id}`,
    },
  };
}

/**
 * Confirm unsubscribe.
 * @function confirmUnsubscribe
 * @param {string} type_url type_url.
 * @param {string} id id.
 * @returns {Object} Get extra items action.
 */
export function confirmUnsubscribeTo(type_url, id) {
  return {
    type: POST_SUBSCRIBE_TO,
    request: {
      op: 'post',
      path: `/@${type_url}-notification-unsubscribe-confirm/${id}`,
    },
  };
}
