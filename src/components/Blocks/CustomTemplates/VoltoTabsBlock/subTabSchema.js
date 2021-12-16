export const subTabSchema = () => ({
  title: 'Vertical tab block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['subtab'],
    },
  ],
  properties: {
    subtab: {
      title: 'Is subtab',
      description: 'Define if this tab is a subTab',
      type: 'boolean',
      default: false,
    },
  },
  required: [],
});
