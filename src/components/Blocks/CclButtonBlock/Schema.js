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
