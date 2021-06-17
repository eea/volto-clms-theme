import React from 'react';

import ObjectListWidget from '@plone/volto/components/manage/Widgets/ObjectListWidget';

const ItemSchema = {
  title: 'Bounding-box',
  properties: {
    east: {
      title: 'East',
      type: 'number',
    },
    west: {
      title: 'West',
      type: 'number',
    },
    north: {
      title: 'North',
      type: 'number',
    },
    south: {
      title: 'South',
      type: 'number',
    },
  },
  fieldsets: [
    {
      id: 'default',
      title: 'Bounding-Box',
      fields: ['east', 'west', 'north', 'south'],
    },
  ],
  required: [],
};

const BoundingWidget = (props) => {
  return (
    <ObjectListWidget
      schema={ItemSchema}
      {...props}
      value={props.value?.items || props.default?.items || []}
      onChange={(id, value) => props.onChange(id, { items: value })}
    />
  );
};

export default BoundingWidget;
