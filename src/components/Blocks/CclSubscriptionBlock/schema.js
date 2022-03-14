export const SubscriptionSchema = () => ({
  title: 'Subscription block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['type'],
    },
  ],
  properties: {
    type: {
      title: 'Subscription type',
      choices: [
        ['news', 'news'],
        ['events', 'events'],
        ['newsletter', 'newsletter'],
      ],
    },
  },
  required: ['product'],
});
