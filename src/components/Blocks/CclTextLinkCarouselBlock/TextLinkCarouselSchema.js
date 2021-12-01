export const HomeProductsSchema = () => ({
  title: 'Home poducts',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['textLink'],
    },
  ],
  properties: {
    textLink: {
      title: 'Text and Link',
      widget: 'text_link_widget',
      type: 'string',
    },
  },
  required: [],
});
