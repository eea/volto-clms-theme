export const AVAILABLE_SUBSCRIPTIONS = [
  {
    title: 'Subscribe to the CLMS updates',
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
  {
    title: 'Subscribe to production updates',
    type: 'productionupdates',
    back_url: 'productionupdates',
  },
];
export const getSubscriptionConfig = (type) => {
  return AVAILABLE_SUBSCRIPTIONS.find(
    (subscription) => subscription.type === type,
  );
};
