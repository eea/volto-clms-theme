export const SubscriptionSchema = () => ({
  title: 'Subscription block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['type', 'title'],
    },
  ],
  properties: {
    type: {
      title: 'Subscription type',
      choices: [
        ['news', 'news'],
        ['events', 'events'],
        ['newsletter', 'newsletter'],
        ['productionupdates', 'productionupdates'],
      ],
    },
    title: {
      title: 'Title',
      type: 'string',
    },
  },
  required: ['product'],
});
