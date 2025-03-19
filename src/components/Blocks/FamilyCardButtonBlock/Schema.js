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

export const cclButtonSchema = (extras) => ({
  title: 'Button default',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'href', ...extras],
    },
    {
      id: 'style',
      title: 'Style',
      fields: ['style', 'disabled'],
    },
  ],
  properties: {
    title: {
      title: 'Title',
      description: 'Add button text',
      type: 'string',
    },
    href: {
      title: 'URL',
      description: 'Select site content or paste external url',
      widget: 'object_by_type',
      schemas: [
        {
          id: 'external',
          icon: externalSVG,
          schema: ExternalLinkSchema,
        },
      ],
    },
    style: {
      title: 'Button style',
      choices: [
        ['default', 'Default'],
        ['filled', 'Filled'],
        ['left menu', 'Left Menu block'],
      ],
      default: 'default',
    },
    disabled: {
      title: 'Disabled',
      type: 'boolean',
      default: false,
    },
    download: {
      title: 'Download',
      type: 'boolean',
      description: 'Add download attribute',
      default: false,
    },
    target: {
      title: 'Target',
      description: 'Select target type',
      choices: [
        ['_self', 'Default'],
        ['_blank', 'Blank'],
      ],
      default: '_self',
    },
  },
  required: ['title', 'style'],
});
