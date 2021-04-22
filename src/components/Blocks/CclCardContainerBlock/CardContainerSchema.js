export const CardContainerSchema = () => ({
  title: 'Card container',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'cardStyle', 'customCards'],
    },
  ],
  properties: {
    title: {
      title: 'Title',
      description: 'Card container block friendly name',
      type: 'string',
    },
    cardStyle: {
      title: 'Card style',
      choices: [
      ['line','Line card'],
      ['block','Block card'],
      ['line-color','Colored Line card'],
      ],
    },
    customCards: {
      title: 'Custom cards',
      type: 'boolean',
    }
  },
  required: ['cardStyle'],
});