export const TechnicalLibrariesListSchema = () => ({
  title: 'TechnicalLibraries List block',
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
