import React from 'react';

import ObjectListWidget from '@plone/volto/components/manage/Widgets/ObjectListWidget';

const ItemSchema = {
  title: 'MapLayersWidget',
  properties: {
    id: {
      title: 'Layer id',
      description: 'Enter the layer id',
      type: 'string',
    },
    title: {
      title: 'Layer title',
      description: 'Enter the title of the layer',
      type: 'string',
    },
  },
  fieldsets: [
    {
      id: 'default',
      title: 'Layer',
      fields: ['id', 'title'],
    },
  ],
  required: [],
};

const MapLayersWidget = (props) => {
  return (
    <ObjectListWidget
      schema={ItemSchema}
      {...props}
      value={props.value?.items || props.default?.items || []}
      onChange={(id, value) => props.onChange(id, { items: value })}
    />
  );
};

export default MapLayersWidget;
