export const HomeBgImageSchema = (config, hasButton, hasLocationInfo) => {
  const variationsConfig = config.blocks.blocksConfig['homeBgImage'].variations;
  const variations = Object.keys(variationsConfig).map((variation) => [
    variationsConfig[variation].id,
    variationsConfig[variation].title,
  ]);
  const hasButtonFieldset = hasButton
    ? [
        {
          id: 'buttonStyle',
          title: 'Button style',
          fields: ['buttonTitle', 'href', 'style', 'disabled'],
        },
      ]
    : [];
  const hasLocationFieldset = hasLocationInfo
    ? [
        {
          id: 'locationInfo',
          title: 'Location info',
          fields: ['locationInfoTitle', 'locationDescription'/* , 'infoLink' */],
        },
      ]
    : [];
  return {
    title: 'Card container',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'title',
          'subtitle',
          'description',
          'variation',
          'location',
          'hasLocationInfo',
          'hasButton',
        ],
      },
      ...hasLocationFieldset,
      ...hasButtonFieldset,
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
      location: {
        title: 'Location',
        description: 'Green bg location',
        type: 'string',
      },
      hasLocationInfo: {
        title: 'Location info',
        description: 'Green bg location info',
        type: 'boolean',
        default: false,
      },
      locationInfoTitle: {
        title: 'Location info title',
        description: 'Green bg location info title',
        type: 'string',
      },
      locationDescription: {
        title: 'Location description',
        description: 'Green bg location description',
        type: 'string',
      },
      // infoLink: {
      //   title: 'URL',
      //   description: 'Select site content or paste external url',
      //   widget: 'object_browser',
      //   mode: 'link',
      //   selectedItemAttrs: ['Title', 'Description', '@type', '@id'],
      //   allowExternals: false,
      // },
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
