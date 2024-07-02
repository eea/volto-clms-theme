import { getFontAwesomeIconList } from './fontawesome';

export const fontAwesomeSchema = (props) => {
  const { fontAwesomeRegular } = props;

  const choices = getFontAwesomeIconList([
    fontAwesomeRegular.far,
  ]).map((item) => [item.iconName, item.iconName]);

  return {
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
        choices: choices,
      },
    },
    required: [],
  };
};
