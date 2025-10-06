const ChatbotBannerBlockSchema = {
  title: 'Chatbot Banner Block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['logo', 'logoLink', 'text', 'buttonText', 'buttonLink'],
    },
  ],
  properties: {
    logo: {
      title: 'Logo Image URL',
      widget: 'url',
      description:
        'Direct URL to the logo image (e.g. https://example.com/logo.png/@@images/image-159-33658afa10134572e80822e139c721c4.png)',
    },
    logoLink: {
      title: 'Logo Click Link',
      widget: 'url',
      description: 'Optional: URL to open when clicking the logo',
    },
    text: {
      title: 'Banner Text',
      widget: 'textarea',
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
