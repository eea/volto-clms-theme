export const AVAILABLE_SUBSCRIPTIONS = [
  {
    title: 'Subscribe to our newsletter',
    type: 'newsletter',
    back_url: 'newsletter',
  },
  {
    title: 'Subscribe to our news',
    type: 'news',
    back_url: 'newsitem',
  },
  {
    title: 'Subscribe to our events',
    type: 'events',
    back_url: 'event',
  },
];
export const getSubscriptionConfig = (type) => {
  return AVAILABLE_SUBSCRIPTIONS.find(
    (subscription) => subscription.type === type,
  );
};
