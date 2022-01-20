export const AVAILABLE_SUBSCRIPTIONS = [
  {
    title: 'SUBSCRIBE TO OUR NEWSLETTER',
    type: 'newsletter',
    back_url: 'newsletter',
  },
  {
    title: 'SUBSCRIBE TO OUR NEWS',
    type: 'news',
    back_url: 'newsitem',
  },
  {
    title: 'SUBSCRIBE TO OUR EVENTS',
    type: 'events',
    back_url: 'event',
  },
];
export const getSubscriptionConfig = (type) => {
  return AVAILABLE_SUBSCRIPTIONS.find(
    (subscription) => subscription.type === type,
  );
};
