export const CardContainerSchema = () => ({
  title: 'Card container',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['customCards'],
    },
  ],
  properties: {
    customCards: {
      title: 'Custom cards',
      type: 'panels',
      schema: CardBlockSchema,
    },
  },
  required: ['cardOrigin'],
});

export const CardBlockSchema = () => {
  return {
    title: 'Card block',
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
        description: 'Card title',
        type: 'string',
        placeholder: 'Card title here',
      },
      url: {
        title: 'URL',
        widget: 'object_browser',
        mode: 'link',
        allowExternals: true,
      },
    },
    required: [],
  };
};
