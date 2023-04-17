export const TextLinkCarouselSchema = () => ({
  title: 'Home text link carousel',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['textLink', 'speed'],
    },
  ],
  properties: {
    textLink: {
      title: 'Text and Link',
      widget: 'text_link_widget',
      type: 'string',
    },
    speed: {
      title: 'Speed',
      type: 'number',
    },
  },
  required: [],
});
