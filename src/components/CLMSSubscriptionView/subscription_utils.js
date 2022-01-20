const AVAILABLE_SUBSCRIPTIONS = [
  {
    tile: 'SUBSCRIBE TO OUR NEWSLETTER',
    type: 'newsletter',
    back_url: 'newsletter',
  },
  {
    tile: 'SUBSCRIBE TO OUR NEWS',
    type: 'news',
    back_url: 'newsitem',
  },
  {
    tile: 'SUBSCRIBE TO OUR EVENTS',
    type: 'events',
    back_url: 'event',
  },
];
export const getSubscriptionConfig = (type) => {
  return AVAILABLE_SUBSCRIPTIONS.find(
    (subscription) => subscription.type === type,
  );
};
