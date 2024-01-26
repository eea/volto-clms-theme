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

export const CardBlockSchema = (hasButton) => {
  const hasButtonFieldset = hasButton
    ? [
        {
          id: 'buttonStyle',
          title: 'Button style',
          fields: ['buttonTitle', 'style', 'disabled'],
        },
      ]
    : [];

  return {
    title: 'Card block',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'description', 'url'],
      },
      ...hasButtonFieldset,
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
      // hasButton: {
      //   title: 'Button',
      //   type: 'boolean',
      //   default: false,
      // },
      buttonTitle: {
        title: 'Title',
        description: 'Add button text',
        type: 'string',
      },
      style: {
        title: 'Button style',
        choices: [
          ['default', 'Default'],
          ['filled', 'Filled'],
        ],
        default: 'default',
      },
      disabled: {
        title: 'Disabled',
        type: 'boolean',
        default: false,
      },
    },
    required: [],
  };
};
