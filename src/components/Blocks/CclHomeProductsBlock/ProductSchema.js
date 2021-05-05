export const ProductSchema = () => ({
  title: 'Poduct',
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
        ['land', 'Landscape'],
        ['warning', 'Warning'],
        ['leaf', 'Leaf'],
        ['computer', 'Computer'],
        ['database', 'Database'],
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
