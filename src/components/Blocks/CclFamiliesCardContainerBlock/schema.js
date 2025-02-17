export const CardContainerSchema = () => ({
  title: 'Card container',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'customCards'],
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
  required: ['cardOrigin'],
});

export const CardBlockSchema = () => {
  return {
    title: 'Card block',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'description', 'href'],
      },
    ],
    properties: {
      title: {
        title: 'Title',
        description: 'Card title',
        type: 'string',
        placeholder: 'Card title here',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      href: {
        title: 'Link',
        type: 'string',
      },
    },
    required: [],
  };
};
