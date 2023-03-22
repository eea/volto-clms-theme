import { defineMessages } from 'react-intl';

const messages = defineMessages({
  noResultsConfiguration: {
    id: 'noResultsConfiguration',
    defaultMessage: 'No results component',
  },
  querystringConfiguration: {
    id: 'querystringConfiguration',
    defaultMessage: 'Query',
  },
  noResultsTitle: {
    id: 'noResultsTitle',
    defaultMessage: 'No results component text.',
  },
  noResultsDescription: {
    id: 'noResultsDescription',
    defaultMessage: 'The text to show when there are no results.',
  },
});

export const noResultsSchema = (props) => {
  const { intl, schema } = props;
  return {
    ...schema,
    fieldsets: [
      {
        ...schema.fieldsets[0],
        fields: schema.fieldsets[0].fields.filter((f) => f !== 'querystring'),
      },
      {
        id: 'querystring',
        title: intl.formatMessage(messages.querystringConfiguration),
        fields: ['querystring'],
      },
      {
        ...schema.fieldsets[1],
      },
      {
        id: 'noResults',
        title: intl.formatMessage(messages.noResultsConfiguration),
        fields: ['noResults'],
      },
    ],
    properties: {
      ...schema.properties,
      noResults: {
        title: intl.formatMessage(messages.noResultsTitle),
        description: intl.formatMessage(messages.noResultsDescription),
        widget: 'richtext',
      },
    },
  };
};
