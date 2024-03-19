// eslint-disable-next-line import/no-unresolved
import * as original from '@eeacms/volto-listing-block/blocks/Listing/schema';

const CallToActionSchema = ({ formData }) => {
  return {
    fieldsets: [
      {
        id: 'default',
        fields: [
          'enable',
          ...(formData?.itemModel?.callToAction?.enable
            ? [
                'label',
                formData?.['@type'] === 'listing' ? 'urlTemplate' : 'href',
              ]
            : []),
        ],
        title: 'Default',
      },
    ],
    properties: {
      enable: {
        type: 'boolean',
        title: 'Show action',
      },
      label: {
        title: 'Action label',
        default: 'Read more',
        defaultValue: 'Read more',
      },
      href: {
        title: 'Action URL',
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description'],
        allowExternals: true,
      },
      urlTemplate: {
        title: 'Action URL Template',
        description:
          'Enter a path. Available placeholders: $URL, $PORTAL_URL. If empty, the result URL will be used.',
      },
    },
    required: [],
  };
};

const setCardModelSchema = (args) => {
  const { formData, schema } = args;

  const itemModelSchema = schema.properties.itemModel.schema;
  itemModelSchema.fieldsets[0].fields = [
    ...itemModelSchema.fieldsets[0].fields,
    'hasLink',
    'titleOnImage',
    'maxTitle',
    'hasDate',
    'hasEventDate',
    'hasDescription',
    ...(formData?.itemModel?.hasDescription ? ['maxDescription'] : []),
    'hasMetaType',
    'hasLabel',
    'hasTags',
    'callToAction',
  ];
  itemModelSchema.properties = {
    ...itemModelSchema.properties,
    titleOnImage: {
      title: 'Display title on image',
      type: 'boolean',
      default: false,
    },
    hasLink: {
      title: 'Enable link',
      description: 'Link to source content',
      type: 'boolean',
      default: true,
    },
    hasDate: {
      title: 'Publication date',
      type: 'boolean',
      default: false,
    },
    hasEventDate: {
      title: 'Event date',
      type: 'boolean',
      default: false,
    },
    hasDescription: {
      title: 'Description',
      type: 'boolean',
    },
    maxTitle: {
      title: 'Title max lines',
      description:
        "Limit title to a maximum number of lines by adding trailing '...'",
      type: 'number',
      default: 2,
      minimum: 0,
      maximum: 5,
    },
    maxDescription: {
      title: 'Description max lines',
      description:
        "Limit description to a maximum number of lines by adding trailing '...'",
      type: 'number',
      default: 2,
      minimum: 0,
      // maximum set to 8 for some testing
      maximum: 10,
    },
    hasMetaType: {
      title: 'Show portal type',
      type: 'boolean',
    },
    hasLabel: {
      title: 'Show new/archived label',
      type: 'boolean',
    },
    hasTags: {
      title: 'Show tags',
      type: 'boolean',
    },
    callToAction: {
      widget: 'object',
      schema: CallToActionSchema({ formData }),
    },
  };
  return schema;
};

original.setCardModelSchema = setCardModelSchema;

module.exports = original;
