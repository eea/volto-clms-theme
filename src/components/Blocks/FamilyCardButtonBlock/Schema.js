import externalSVG from '@plone/volto/icons/link.svg';
import internalSVG from '@plone/volto/icons/nav.svg';
import emailSVG from '@plone/volto/icons/email.svg';

export const EmailLinkSchema = {
  title: 'Email address',
  fieldsets: [
    {
      id: 'email',
      title: 'Email',
      fields: ['email_address', 'email_subject'],
    },
  ],
  properties: {
    email_address: {
      title: 'Email address',
    },
    email_subject: {
      title: 'Email subject',
      description: 'Optional',
    },
  },
  required: [],
};

export const InternalLinkSchema = {
  title: 'Internal link',
  fieldsets: [
    {
      id: 'internal',
      title: 'Internal',
      fields: ['internal_link'],
    },
  ],
  properties: {
    internal_link: {
      widget: 'object_browser',
      title: 'Internal link',
      multiple: false,
      mode: 'link',
      selectedItemAttrs: [],
    },
  },
  required: [],
};

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
        {
          id: 'internal',
          icon: internalSVG,
          schema: InternalLinkSchema,
        },
        {
          id: 'email',
          icon: emailSVG,
          schema: EmailLinkSchema,
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
