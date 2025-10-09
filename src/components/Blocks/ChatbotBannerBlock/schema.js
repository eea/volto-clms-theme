const ChatbotBannerBlockSchema = {
  title: 'Chatbot Banner Block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'text', 'buttonText', 'buttonLink'],
    },
  ],
  properties: {
    title: {
      title: 'Banner Title',
      description: 'e.g. "Your smart CLMS guide"',
    },
    text: {
      title: 'Banner Text',
      widget: 'textarea',
      description: 'Descriptive paragraph text.',
    },
    buttonText: {
      title: 'Button Text',
      default: 'Open AI Assistant',
    },
    buttonLink: {
      title: 'Button Link',
      widget: 'url',
    },
  },
  required: [],
};

export default ChatbotBannerBlockSchema;
