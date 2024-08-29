export const subTabSchema = () => ({
  title: 'Vertical tab block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['subtab', 'redirectURL'],
    },
  ],
  properties: {
    subtab: {
      title: 'Is subtab',
      description: 'Define if this tab is a subTab',
      type: 'boolean',
      default: false,
    },
    redirectURL: {
      title: 'Redirect URL',
      description: 'Redirect URL',
      widget: 'url',
    },
  },
  required: [],
});
