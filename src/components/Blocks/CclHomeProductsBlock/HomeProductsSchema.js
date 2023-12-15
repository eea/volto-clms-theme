export const HomeProductsSchema = () => ({
  title: 'Home poducts',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'products'],
    },
  ],
  properties: {
    title: {
      title: 'Title',
      description: 'Friendly name for the products band',
      type: 'string',
    },
    products: {
      title: 'Product cards',
      type: 'panels',
      schema: ProductSchema,
    },
  },
  required: [],
});

export const ProductSchema = () => ({
  title: 'Product',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'description', 'productIcon', 'linkSelector'],
    },
  ],
  properties: {
    title: {
      title: 'Title',
      type: 'string',
    },
    description: {
      title: 'Description',
      type: 'string',
    },
    productIcon: {
      title: 'Product icon',
      choices: [
        ['iconless', 'Without icon'],
        ['Landscape', 'Landscape'],
        ['Warning', 'Warning'],
        ['Leaf', 'Leaf'],
        ['Computer', 'Computer'],
        ['Database', 'Database'],
        ['Satellite', 'Satellite'],
      ],
    },
    linkSelector: {
      title: 'Url',
      description: 'Paste external url',
      /* mode: 'link',
      widget: 'url',
      selectedItemAttrs: ['Title', 'Description', '@type', '@id'],
      allowExternals: true, */
    },
  },
  required: [],
});
