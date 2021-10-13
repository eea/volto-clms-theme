export const CardBlockSchema = () => ({
  title: 'Product card block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'image', 'description', 'href', 'cardStyle'],
    },
  ],
  properties: {
    title: {
      title: 'Title',
      description: 'Card title',
      type: 'string',
      placeholder: 'Card title here',
    },
    image: {
      title: 'Card image',
    },
    description: {
      title: 'Product description',
      type: 'string',
    },
    href: {
      title: 'URL',
      description: 'Select site content or paste external url',
      widget: 'object_browser',
      mode: 'link',
      selectedItemAttrs: ['Title', 'Description', '@type', '@id'],
      allowExternals: true,
    },
    cardStyle: {
      title: 'Card style',
      choices: [
        ['line', 'Line card'],
        ['block', 'Block card'],
        ['line-color', 'Colored Line card'],
        ['event', 'Event card'],
        ['news', 'News card'],
      ],
    },
  },
  required: ['product'],
});
