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
        'Enter whether this layer should be hidden in the data viewer',
      type: 'boolean',
      default: false,
    },
    static_legend_url: {
      title: 'URL to static image legend',
      description:
        'If it is filled, the legend shown on the map will be the image behind the URL',
      type: 'string',
      default: '',
    },
    filter_static_legend_url: {
      title: 'URL to static image legend used in filters',
      description:
        'If it is filled, the legend shown on the map when using filters will be the image behind the URL',
      type: 'string',
      default: '',
    },
    fields: {
      title: 'Fields to be shown in the mapviewer',
      description:
        'List of fields to appear in the Layer info widget in JSON format. This info can be imported from the dataset page "import WMS Fields"',
      type: 'text',
      default: '',
    },
  },
  fieldsets: [
    {
      id: 'default',
      title: 'Layer',
      fields: [
        'id',
        'title',
        'default_active',
        'hide',
        'static_legend_url',
        'filter_static_legend_url',
        'fields',
      ],
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
