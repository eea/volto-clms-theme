import { defineMessages } from 'react-intl';
const messages = defineMessages({
  field_html_description: {
    id: 'field_html_description',
    defaultMessage: 'HTML formatted description',
  },
});

const CheckboxSchemaExtender = (intl) => {
  return {
    fields: ['html_description'],
    properties: {
      html_description: {
        title: intl.formatMessage(messages.field_html_description),
        widget: 'richtext',
      },
    },
    required: ['html_description'],
  };
};

export default CheckboxSchemaExtender;
