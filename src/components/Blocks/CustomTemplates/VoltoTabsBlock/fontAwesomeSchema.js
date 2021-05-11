export const fontAwesomeSchema = () => ({
  title: 'Font Awesome icons',
  fieldsets: [
    {
      id: 'default',
      title: 'Default font',
      fields: ['fontAwesome'],
    },
  ],
  properties: {
    fontAwesome: {
      title: 'Font awesome',
      description: 'Search font awesome icon',
      choices: [
        ['xx-small', 'xx-small'],
        ['x-small', 'x-small'],
        ['small', 'small'],
        ['medium', 'medium'],
        ['large', 'large'],
        ['x-large', 'x-large'],
        ['xx-large', 'xx-large'],
        ['xxx-large', 'xxx-large'],
      ],
    },
  },
  required: [],
});
