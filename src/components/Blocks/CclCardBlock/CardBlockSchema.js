export const CardBlockSchema = () => ({
  title: 'Product card block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'image', 'description', 'url', 'cardStyle'],
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
    url: {
      title: 'url',
      type: 'string',
    },
    cardStyle: {
      title: 'Card style',
      choices: [
        ['line', 'Line card'],
        ['block', 'Block card'],
        ['line-color', 'Colored Line card'],
      ],
    },
  },
  required: ['product'],
});
