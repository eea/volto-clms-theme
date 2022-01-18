/**
 * Post subscribers.
 * @module actions/event
 */
export const DEL_EVENT_SUBSCRIBER = 'DEL_EVENT_SUBSCRIBER';

/**
 * Delete subscription.
 * @function deleteSubscription
 * @returns {Object} Delete token action.
 */
export function deleteSubscription(email) {
  return {
    type: DEL_EVENT_SUBSCRIBER,
    request: {
      op: 'del',
      path: `/@cleanup-event-notification-subscriptions`,
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
    type: DEL_EVENT_SUBSCRIBER,
    request: {
      op: 'del',
      path: `/@cleanup-event-notification-subscription-requests`,
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
    type: DEL_EVENT_SUBSCRIBER,
    request: {
      op: 'del',
      path: `/@cleanup-event-notification-unsubscription-requests`,
      data: { email: email },
    },
  };
}
