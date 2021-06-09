export const UseCaseListSchema = () => ({
  title: 'UseCase List block',
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
  required: [],
});
