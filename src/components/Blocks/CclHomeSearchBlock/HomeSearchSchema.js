export const HomeSearchSchema = () => ({
  title: 'Home search block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title'],
    },
  ],
  properties: {
    title: {
      title: 'Title',
      type: 'string',
    },
  },
  required: ['title'],
});
