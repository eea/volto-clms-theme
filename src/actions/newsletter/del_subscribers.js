/**
 * Post subscribers.
 * @module actions/newsletter
 */
export const DEL_SUBSCRIBERS = 'DEL_SUBSCRIBERS';

/**
 * Delete subscription.
 * @function deleteSubscription
 * @returns {Object} Delete token action.
 */
export function deleteSubscription(email) {
  return {
    type: DEL_SUBSCRIBERS,
    request: {
      op: 'del',
      path: `/@cleanup-newsletter-notification-subscriptions`,
      data: { email: email },
    },
  };
}

/**
 * Delete subscription request.POST_SUBSCRIBERS
 * @function deleteSubscriptionRequest
 * @returns {Object} Delete token action.
 */
export function deleteSubscriptionRequest(email) {
  return {
    type: DEL_SUBSCRIBERS,
    request: {
      op: 'del',
      path: `/@cleanup-newsletter-notification-subscription-requests`,
      data: { email: email },
    },
  };
}

/**
 * Delete unsubscription request.
 * @function deleteUnsubscriptionRequest
 * @returns {Object} Delete token action.
 */
export function deleteUnsubscriptionRequest(email) {
  return {
    type: DEL_SUBSCRIBERS,
    request: {
      op: 'del',
      path: `/@cleanup-newsletter-notification-unsubscription-requests`,
      data: { email: email },
    },
  };
}
