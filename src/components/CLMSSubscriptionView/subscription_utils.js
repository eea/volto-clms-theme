export const AVAILABLE_SUBSCRIPTIONS = [
  {
    title: 'Subscribe to the newsletter',
    type: 'newsletter',
    back_url: 'newsletter',
  },
  {
    title: 'Subscribe to news notifications',
    type: 'news',
    back_url: 'newsitem',
  },
  {
    title: 'Subscribe to event notifications',
    type: 'events',
    back_url: 'event',
  },
];
export const getSubscriptionConfig = (type) => {
  return AVAILABLE_SUBSCRIPTIONS.find(
    (subscription) => subscription.type === type,
  );
};
