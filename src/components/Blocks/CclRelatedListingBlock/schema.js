import config from '@plone/volto/registry';

const Schema = (types_schema) => {
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
        fields: ['content_type', 'variation'],
      },
    ],
    properties: {
      content_type: {
        title: 'Content Type',
        choices: [...types_schema],
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
