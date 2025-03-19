import externalSVG from '@plone/volto/icons/link.svg';

export const ExternalLinkSchema = {
  title: 'External link',
  fieldsets: [
    {
      id: 'external',
      title: 'External',
      fields: ['external_link'],
    },
  ],
  properties: {
    external_link: {
      title: 'External URL',
      description:
        'URL can be relative within this site or absolute if it starts with http:// or https://',
    },
  },
  required: [],
};

export const CardContainerSchema = () => ({
  title: 'Card container',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['customCards'],
    },
  ],
  properties: {
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
        fields: ['title', 'url'],
      },
    ],
    properties: {
      title: {
        title: 'Title',
        description: 'Card title',
        type: 'string',
        placeholder: 'Card title here',
      },
      url: {
        title: 'URL',
        widget: 'object_by_type',
        schemas: [
          {
            id: 'external',
            icon: externalSVG,
            schema: ExternalLinkSchema,
          },
        ],
      },
    },
    required: [],
  };
};
