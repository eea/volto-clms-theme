export const CardContainerSchema = (types, extras) => ({
  title: 'Card container',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'cardStyle', 'cardOrigin', ...extras],
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
        ['line', 'Line Image card'],
        ['line-color', 'Colored Line card'],
        ['doc', 'Line card'],
        ['block', 'Block card'],
        ['event', 'Event card'],
      ],
      default: 'line',
    },
    contentTypes: {
      title: 'Content Types',
      choices: types,
      isMulti: true,
    },
    cardOrigin: {
      title: 'Cards origin',
      choices: [
        ['current', 'Current folder children'],
        ['selection', 'Selected folder children'],
        ['custom', 'Customized cards'],
      ],
      default: 'current',
    },
    containerSelection: {
      title: 'Card container selector',
      widget: 'object_browser',
      mode: 'link',
    },
    customCards: {
      title: 'Custom cards',
      type: 'panels',
      schema: CardBlockSchema,
    },
  },
  required: ['cardStyle', 'cardOrigin'],
});

export const CardBlockSchema = () => ({
  title: 'Card block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'image', 'description', 'url'],
    },
  ],
  properties: {
    title: {
      title: 'Title',
      description: 'Card title',
      type: 'string',
      placeholder: 'Card title here',
    },
    image: {
      title: 'Card image',
    },
    description: {
      title: 'Product description',
      type: 'string',
    },
    url: {
      title: 'url',
      type: 'string',
    },
  },
  required: [],
});
