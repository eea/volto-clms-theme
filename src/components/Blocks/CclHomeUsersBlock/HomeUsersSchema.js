export const HomeUsersSchema = () => ({
  title: 'Home users',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'moreLinkText', 'moreLinkUrl', 'customCards'],
    },
  ],
  properties: {
    title: {
      title: 'Title',
      description: 'Friendly name for the users band',
      type: 'string',
    },
    moreLinkText: {
      title: 'More link text',
      description: 'The text for the more items link after the band',
      type: 'string',
    },
    moreLinkUrl: {
      title: 'More link url',
      description: 'Internal or external link for the button after the band',
      widget: 'object_browser',
      mode: 'link',
      allowExternals: true,
    },
    customCards: {
      title: 'User cards',
      type: 'panels',
      schema: CardBlockSchema,
    },
  },
  required: [],
});

export const CardBlockSchema = () => ({
  title: 'Product card block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'description', 'productUrl'],
    },
  ],
  properties: {
    title: {
      title: 'Title',
      description: 'Card title',
      type: 'string',
      placeholder: 'Card title here',
    },
    description: {
      title: 'Product description',
      type: 'string',
    },
    productUrl: {
      title: 'Object or url',
      widget: 'object_browser',
      mode: 'link',
      selectedItemAttrs: ['description', 'image_field'],
      allowExternals: true,
    },
  },
  required: ['product'],
});
