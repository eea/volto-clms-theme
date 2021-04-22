export const CardBlockSchema = () => ({
    title: 'Product card block',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['product', 'image', 'description', 'Url', 'cardStyle'],
      },
    ],
    properties: {
      product: {
        title: 'Product',
        description: 'Product card title',
        type: 'string',
      },
      image: {
        title: 'Card image',
      },
      description: {
        title: 'Product description',
        type: 'string',
      },
      Url: {
        title: 'Url',
        type: 'string',
      },
      cardStyle: {
        title: 'Card style',
        choices: [
        ['line','Line card'],
        ['block','Block card'],
        ['line-color','Colored Line card'],
        ],
      }
    },
    required: ['product'],
  });

