import React from 'react';

import ObjectListWidget from '@plone/volto/components/manage/Widgets/ObjectListWidget';

const ItemSchema = {
  title: 'GeonetworkIdentifiersWidget',
  properties: {
    id: {
      title: 'Geonetwork id',
      description: 'Enter the id of this dataset in geonetwork',
      type: 'string',
    },
    title: {
      title: 'Link title',
      description: 'Enter the title of the link to this geonetwork resource',
      type: 'string',
    },
    type: {
      title: 'Geonetwork type',
      description: 'Enter the name of this geonetwor instance',
      choices: [
        ['EEA', 'EEA'],
        ['VITO', 'VITO'],
      ],
    },
  },
  fieldsets: [
    {
      id: 'default',
      title: 'Layer',
      fields: ['id', 'title', 'type'],
    },
  ],
  required: [],
};

const GeonetworkIdentifiersWidget = (props) => {
  return (
    <ObjectListWidget
      schema={ItemSchema}
      {...props}
      value={props.value?.items || props.default?.items || []}
      onChange={(id, value) => props.onChange(id, { items: value })}
    />
  );
};

export default GeonetworkIdentifiersWidget;
