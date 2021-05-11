import { getFontAwesomeIconList } from './fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';

export const fontAwesomeSchema = () => {
  const choices = getFontAwesomeIconList([far]).map((item) => [
    item.iconName,
    item.iconName,
  ]);
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
