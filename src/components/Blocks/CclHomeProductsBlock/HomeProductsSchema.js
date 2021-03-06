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
      fields: ['title', 'productIcon', 'linkSelector'],
    },
  ],
  properties: {
    title: {
      title: 'Title',
      type: 'string',
    },
    productIcon: {
      title: 'Product icon',
      choices: [
        ['iconless', 'Without icon'],
        ['home_product_1', 'Landscape'],
        ['home_product_2', 'Warning'],
        ['home_product_3', 'Leaf'],
        ['home_product_4', 'Computer'],
        ['home_product_5', 'Database'],
      ],
    },
    linkSelector: {
      title: 'Product link selector',
      widget: 'object_browser',
      mode: 'link',
    },
  },
  required: [],
});
