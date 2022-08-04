export const HomeUsersSchema = () => ({
  title: 'Home users',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'customCards'],
    },
  ],
  properties: {
    title: {
      title: 'Title',
      description: 'Friendly name for the users band',
      type: 'string',
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
