import { CardBlockSchema } from '../CclCardBlock/CardBlockSchema';
export const HomeUsersSchema = () => ({
  title: 'Home users',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'customCards'],
    },
  ],
  properties: {
    title: {
      title: 'Title',
      description: 'Friendly name for the users band',
      type: 'string',
    },
    customCards: {
      title: 'User cards',
      type: 'panels',
      schema: CardBlockSchema,
    },
  },
  required: [],
});
