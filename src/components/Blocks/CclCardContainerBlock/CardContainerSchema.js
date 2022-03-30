export const CardContainerSchema = () => ({
  title: 'Card container',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'variation', 'customCards'],
    },
  ],
  properties: {
    title: {
      title: 'Title',
      description: 'Card container block friendly name',
      type: 'string',
    },
    customCards: {
      title: 'Custom cards',
      type: 'panels',
      schema: CardBlockSchema,
    },
  },
  required: ['variation', 'cardOrigin'],
});

export const CardBlockSchema = () => ({
  title: 'Card block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'description', 'url'],
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
      widget: 'object_browser',
      mode: 'link',
      allowExternals: true,
    },
  },
  required: [],
});
