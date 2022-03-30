import React from 'react';
import { ReactTableWidget } from '@eeacms/volto-react-table-widget';

const ItemSchema = () => ({
  title: 'Question answer',
  properties: {
    question: {
      title: 'Question',
      description: 'Enter the question.',
      type: 'string',
    },
    answer: {
      title: 'Answer',
      description: 'Enter the correct Answer for the Question.',
      type: 'string',
    },
  },
  fieldsets: [
    {
      id: 'default',
      title: 'Question',
      fields: ['question', 'answer'],
    },
  ],
  required: [],
});

const DownloadableFilesTableWidget = (props) => {
  return (
    <ReactTableWidget
      schema={ItemSchema()}
      {...props}
      csvexport={true}
      csvimport={true}
      value={props.value?.items || props.default?.items || []}
      onChange={(id, value) => props.onChange(id, { items: value })}
    />
  );
};

export default DownloadableFilesTableWidget;
