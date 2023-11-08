export const HomeBgImageSchema = (
  config,
  hasButton,
  hasLocationInfo,
  hasDatasetButton,
) => {
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
  const hasDatasetButtonFieldset = hasDatasetButton
    ? [
        {
          id: 'datasetButtonStyle',
          title: 'Dataset button style',
          fields: [
            'dataset_buttonTitle',
            'dataset_href',
            'dataset_style',
            'dataset_disabled',
          ],
        },
      ]
    : [];
  const hasLocationFieldset = hasLocationInfo
    ? [
        {
          id: 'locationInfo',
          title: 'Location info',
          fields: ['locationInfoTitle', 'locationDescription', 'locationHref'],
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
          'dataset_title',
          'dataset_subtitle',
          'dataset_description',
          'hasDatasetButton',
        ],
      },
      ...hasLocationFieldset,
      ...hasButtonFieldset,
      ...hasDatasetButtonFieldset,
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
      locationHref: {
        title: 'location URL',
        description: 'Select site content or paste external url',
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description', '@type', '@id'],
        allowExternals: true,
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
      dataset_title: {
        title: 'Dataset title',
        description: 'Dataset div title',
        type: 'string',
      },
      dataset_subtitle: {
        title: 'Dataset subTitle',
        description: 'Dataset div Subtitle',
        type: 'string',
      },
      dataset_description: {
        title: 'Dataset description',
        description: 'Dataset div description',
        type: 'string',
      },
      hasDatasetButton: {
        title: 'Dataset button',
        type: 'boolean',
        default: false,
      },
      dataset_buttonTitle: {
        title: 'Title',
        description: 'Add button text',
        type: 'string',
      },
      dataset_href: {
        title: 'URL',
        description: 'Select site content or paste external url',
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description', '@type', '@id'],
        allowExternals: true,
      },
      dataset_style: {
        title: 'Button style',
        choices: [
          ['default', 'Default'],
          ['filled', 'Filled'],
        ],
        default: 'default',
      },
      dataset_disabled: {
        title: 'Disabled',
        type: 'boolean',
        default: false,
      },
    },
    required: [],
  };
};
