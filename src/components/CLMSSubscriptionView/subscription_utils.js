export const AVAILABLE_SUBSCRIPTIONS = [
  {
    title: 'Subscribe to the CLMS updates',
    type: 'newsletter',
    back_url: 'newsletter',
    name: 'newsletter',
    subscription_name: 'the CLMS updates',
  },
  {
    title: 'Subscribe to news notifications',
    type: 'news',
    back_url: 'newsitem',
    name: 'news',
    subscription_name: 'news',
  },
  {
    title: 'Subscribe to event notifications',
    type: 'events',
    back_url: 'event',
    name: 'events',
    subscription_name: 'event',
  },
  {
    title: 'Subscribe to production updates',
    type: 'productionupdates',
    back_url: 'productionupdates',
    name: 'production updates',
    subscription_name: 'production updates',
  },
];
export const getSubscriptionConfig = (type) => {
  return AVAILABLE_SUBSCRIPTIONS.find(
    (subscription) => subscription.type === type,
  );
};
