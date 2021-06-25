export const HomeBgImageSchema = (config) => {
  const variationsConfig = config.blocks.blocksConfig['homeBgImage'].variations;
  const variations = Object.keys(variationsConfig).map((variation) => [
    variationsConfig[variation].id,
    variationsConfig[variation].title,
  ]);
  return {
    title: 'Card container',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'subtitle', 'description', 'hasButton', 'variation'],
      },
      {
        id: 'buttonStyle',
        title: 'Button style',
        fields: ['buttonTitle', 'style', 'disabled'],
      },
    ],
    properties: {
      title: {
        title: 'Title',
        description: 'Div title',
        type: 'string',
      },
      subtitle: {
        title: 'SubTitle',
        description: 'Div Subtitle',
        type: 'string',
      },
      description: {
        title: 'Description',
        description: 'Div description',
        type: 'string',
      },
      hasButton: {
        title: 'Button',
        type: 'boolean',
        default: false,
      },
      variation: {
        title: 'Variation',
        type: 'array',
        choices: [...variations],
      },
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
    required: ['blockStyle'],
  };
};
