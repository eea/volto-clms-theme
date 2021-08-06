import React from 'react';

import ObjectListWidget from '@plone/volto/components/manage/Widgets/ObjectListWidget';

const ItemSchema = {
  title: 'DownloadableFilesWidget',
  properties: {
    id: {
      title: 'File id',
      description:
        'Enter the file id. This will be used only to identify this item.',
      type: 'number',
    },
    area: {
      title: 'Area',
      description: 'Enter the area of this file.',
      type: 'string',
    },
    year: {
      title: 'Year',
      description: 'Enter the year of this file.',
      type: 'number',
    },
    resolution: {
      title: 'Resolution',
      description: 'Enter the resolution of this file. Ex.: 100m',
      type: 'string',
    },
    type: {
      title: 'Type',
      description: 'Enter the file type of this file. Ex.: Raster',
      type: 'string',
    },
    format: {
      title: 'Format',
      description: 'Enter the format of this file.',
      type: 'string',
    },
    version: {
      title: 'Version',
      description: 'Enter the version of this file.',
      type: 'string',
    },
    size: {
      title: 'Size',
      description: 'Enter the size of this file. Ex.: 3.5 GB',
      type: 'string',
    },
    path: {
      title: 'Path',
      description: 'Enter the absolute path of this file in the storage',
      type: 'string',
    },
  },
  fieldsets: [
    {
      id: 'default',
      title: 'File',
      fields: [
        'id',
        'area',
        'year',
        'resolution',
        'type',
        'format',
        'version',
        'size',
        'path',
      ],
    },
  ],
  required: [],
};

const DownloadableFilesWidget = (props) => {
  return (
    <ObjectListWidget
      schema={ItemSchema}
      {...props}
      value={props.value?.items || props.default?.items || []}
      onChange={(id, value) => props.onChange(id, { items: value })}
    />
  );
};

export default DownloadableFilesWidget;
