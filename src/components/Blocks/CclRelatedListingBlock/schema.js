import config from '@plone/volto/registry';

const Schema = () => {
  const variationsConfig =
    config.blocks.blocksConfig['relatedListing'].variations;
  const variations = Object.keys(variationsConfig).map((variation) => [
    variationsConfig[variation].id,
    variationsConfig[variation].title,
  ]);
  return {
    title: 'Related Items List block',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'content_type', 'variation'],
      },
    ],
    properties: {
      title: {
        title: 'Title',
        type: 'string',
      },
      content_type: {
        title: 'Content Type',
        choices: [
          ['News Item', 'News Item'],
          ['Event', 'Event'],
        ],
      },
      variation: {
        title: 'Variation',
        type: 'array',
        choices: [...variations],
      },
    },
    required: [],
  };
};

export default Schema;
