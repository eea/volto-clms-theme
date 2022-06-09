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
    default_active: {
      title: 'Default active?',
      description: 'Enter whether this layer should be active by default',
      type: 'boolean',
    },
    hide: {
      title: 'Hide layer?',
      description:
        'Enter whether this layer should be hidden in the map viewer',
      type: 'boolean',
      default: false,
    },
    static_legend_url: {
      title: "URL to static image legend",
      description: 'If it is filled, the legend shown on the map will be the image behind the URL',
      type: 'string',
      default: ''
    }
  },
  fieldsets: [
    {
      id: 'default',
      title: 'Layer',
      fields: ['id', 'title', 'default_active', 'hide', 'static_legend_url'],
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
