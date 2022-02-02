import config from '@plone/volto/registry';

const Schema = (props) => {
  const { types_schema } = props;
  const variationsConfig =
    config.blocks.blocksConfig['relatedListing'].variations;
  const variations = Object.keys(variationsConfig).map((variation) => [
    variationsConfig[variation].id,
    variationsConfig[variation].title,
  ]);
  var type_choices = types_schema ? [...types_schema] : [];
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
        choices: type_choices,
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
