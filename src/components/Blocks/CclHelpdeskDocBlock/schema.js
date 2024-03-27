const schema = {
  title: 'Documentation block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'url'],
    },
  ],
  properties: {
    title: {
      title: 'Title',
      description: 'Documentation block title',
      type: 'string',
    },
    url: {
      title: 'URL',
      description: 'GitHub documentation .req file raw url',
      mode: 'link',
      allowExternals: true,
    },
  },
  required: ['title', 'url'],
};

export default schema;
