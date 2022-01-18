/**
 * Post subscribers.
 * @module actions/event
 */
export const POST_SUBSCRIBE_TO_EVENT = 'POST_SUBSCRIBE_TO_EVENT';
export const POST_CONFIRM_SUBSCRIBE_TO_EVENT =
  'POST_CONFIRM_SUBSCRIBE_TO_EVENT';
export const POST_UNSUBSCRIBE_TO_EVENT = 'POST_UNSUBSCRIBE_TO_EVENT';
export const POST_CONFIRM_UNSUBSCRIBE_TO_EVENT =
  'POST_CONFIRM_UNSUBSCRIBE_TO_EVENT';

/**
 * Subscribe to event.
 * @function subscribe
 * @returns {Object} Get extra items action.
 */
export function subscribeToEvent(email) {
  return {
    type: POST_SUBSCRIBE_TO_EVENT,
    request: {
      op: 'post',
      path: `/@event-notification-subscribe`,
      data: { email: email },
    },
  };
}

/**
 * Unsubscribe to event.
 * @function unsubscribe
 * @returns {Object} Get extra items action.
 */
export function unsubscribeToEvent(email) {
  return {
    type: POST_UNSUBSCRIBE_TO_EVENT,
    request: {
      op: 'post',
      path: `/@event-notification-unsubscribe`,
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
export function confirmSubscribeToEvent(key_id) {
  return {
    type: POST_CONFIRM_SUBSCRIBE_TO_EVENT,
    request: {
      op: 'post',
      path: `/@event-notification-subscribe-confirm/${key_id}`,
    },
  };
}

/**
 * Confirm unsubscribe.
 * @function confirmUnsubscribe
 * @param {string} key_id key_id.
 * @returns {Object} Get extra items action.
 */
export function confirmUnsubscribeToEvent(key_id, email) {
  return {
    type: POST_CONFIRM_UNSUBSCRIBE_TO_EVENT,
    request: {
      op: 'post',
      path: `/@event-notification-unsubscribe-confirm/${key_id}`,
      data: { email: email },
    },
  };
}
