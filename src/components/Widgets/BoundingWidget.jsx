import React from 'react';

import ObjectListWidget from '@plone/volto/components/manage/Widgets/ObjectListWidget';

const ItemSchema = {
  title: 'Bounding-box',
  properties: {
    west: {
      title: 'West',
      description: 'West side Longitude, between -180 and 180',
      type: 'number',
      minimum: -180,
      maximum: 180,
    },
    east: {
      title: 'East',
      description: 'East side Longitude, between -180 and 180',
      type: 'number',
      minimum: -180,
      maximum: 180,
    },
    north: {
      title: 'North',
      description: 'North side Latitude, between -90 and 90',
      type: 'number',
      minimum: -90,
      maximum: 90,
    },
    south: {
      title: 'South',
      description: 'South side Latitude, between -90 and 90',
      type: 'number',
      minimum: -90,
      maximum: 90,
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
