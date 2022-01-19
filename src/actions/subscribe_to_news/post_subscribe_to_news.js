/**
 * Post subscribers.
 * @module actions/news
 */
export const POST_SUBSCRIBE_TO_NEWS = 'POST_SUBSCRIBE_TO_NEWS';
export const POST_CONFIRM_SUBSCRIBE_TO_NEWS = 'POST_CONFIRM_SUBSCRIBE_TO_NEWS';
export const POST_UNSUBSCRIBE_TO_NEWS = 'POST_UNSUBSCRIBE_TO_NEWS';
export const POST_CONFIRM_UNSUBSCRIBE_TO_NEWS =
  'POST_CONFIRM_UNSUBSCRIBE_TO_NEWS';

/**
 * Subscribe to news.
 * @function subscribe
 * @returns {Object} Get extra items action.
 */
export function subscribeToNews(email) {
  return {
    type: POST_SUBSCRIBE_TO_NEWS,
    request: {
      op: 'post',
      path: `/@newsitem-notification-subscribe`,
      data: { email: email },
    },
  };
}

/**
 * Unsubscribe to newsitem.
 * @function unsubscribe
 * @returns {Object} Get extra items action.
 */
export function unsubscribeToNews(email) {
  return {
    type: POST_UNSUBSCRIBE_TO_NEWS,
    request: {
      op: 'post',
      path: `/@newsitem-notification-unsubscribe`,
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
export function confirmSubscribeToNews(key_id) {
  return {
    type: POST_CONFIRM_SUBSCRIBE_TO_NEWS,
    request: {
      op: 'post',
      path: `/@newsitem-notification-subscribe-confirm/${key_id}`,
    },
  };
}

/**
 * Confirm unsubscribe.
 * @function confirmUnsubscribe
 * @param {string} key_id key_id.
 * @returns {Object} Get extra items action.
 */
export function confirmUnsubscribeToNews(key_id, email) {
  return {
    type: POST_CONFIRM_UNSUBSCRIBE_TO_NEWS,
    request: {
      op: 'post',
      path: `/@newsitem-notification-unsubscribe-confirm/${key_id}`,
      data: { email: email },
    },
  };
}
