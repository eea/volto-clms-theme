const AVAILABLE_SUBSCRIPTIONS = [
  {
    type: 'newsletter',
    back_url: 'newsletter',
  },
  {
    type: 'news',
    back_url: 'newsitem',
  },
  {
    type: 'events',
    back_url: 'event',
  },
];
export const getSubscriptionConfig = (type) => {
  return AVAILABLE_SUBSCRIPTIONS.find(
    (subscription) => subscription.type === type,
  );
};
