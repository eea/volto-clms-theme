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

export const CardBlockSchema = (hasExtras, hasButton) => {
  const hasExtrasFieldset = hasExtras
    ? [
        {
          id: 'extraFields',
          title: 'Extra fields',
          fields: ['subtitle', 'hasButton'],
        },
      ]
    : [];
  const hasButtonFieldset = hasButton
    ? [
        {
          id: 'buttonStyle',
          title: 'Button style',
          fields: ['buttonTitle', 'href', 'style', 'disabled'],
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
      ...hasExtrasFieldset,
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
      subtitle: {
        title: 'SubTitle',
        description: 'Div Subtitle',
        type: 'string',
      },
      hasButton: {
        title: 'Button',
        type: 'boolean',
        default: false,
      },
      buttonTitle: {
        title: 'Title',
        description: 'Add button text',
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
