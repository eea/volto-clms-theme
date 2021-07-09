export const HomeSearchSchema = () => ({
  title: 'Home search block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'linkText', 'link'],
    },
  ],
  properties: {
    title: {
      title: 'Title',
      type: 'string',
    },
    linkText: {
      title: 'Link text',
      description: 'Text for the link to the catalogue',
      type: 'string',
    },
    link: {
      title: 'Link',
      description: 'Select site content or paste external url',
      widget: 'object_browser',
      mode: 'link',
      selectedItemAttrs: ['Title', 'Description', '@type', '@id'],
      allowExternals: true,
    },
  },
  required: ['title'],
});
