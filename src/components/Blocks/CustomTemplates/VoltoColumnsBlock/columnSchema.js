export const CardBlockSchema = (intl) => {
  return {
    title: 'Card block',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'description', 'href', 'productIcon'],
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
        title: 'Description',
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
      productIcon: {
        title: 'Product icon',
        choices: [
          ['iconless', 'Without icon'],
          ['Landscape green bg', 'Landscape green bg'],
          ['Warning green bg', 'Warning green bg'],
          ['Leaf green bg', 'Leaf green bg'],
          ['Computer green bg', 'Computer green bg'],
          ['Database green bg', 'Database green bg'],
          ['Satellite green bg', 'Satellite green bg'],
        ],
      },
    },
    required: [],
  };
};
