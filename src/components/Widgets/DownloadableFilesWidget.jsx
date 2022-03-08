import React from 'react';
import ObjectListWidget from '@plone/volto/components/manage/Widgets/ObjectListWidget';

const ItemSchema = () => ({
  title: 'Downloadable File',
  properties: {
    title: {
      title: 'Title',
      description: 'Enter the title of this file.',
      type: 'string',
    },
    area: {
      title: 'Area of interest',
      description: 'Enter the area of this file.',
      type: 'string',
    },
    year: {
      title: 'Year',
      description: 'Enter the year of this file.',
      type: 'number',
    },
    version: {
      title: 'Version',
      description: 'Enter the version of this file.',
      type: 'string',
    },
    resolution: {
      title: 'Resolution',
      description: 'Enter the resolution of this file. Ex.: 100m',
      type: 'string',
    },
    type: {
      title: 'Type',
      description: 'Enter the file type of this file. Ex.: Raster or Vector',
      choices: [
        ['Raster', 'Raster'],
        ['Vector', 'Vector'],
      ],
      // type: 'string',
      // controlled vocabulary: 'raster' or 'vector'
    },
    format: {
      title: 'Format',
      description: 'Enter the format of this file.',
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
        'title',
        'area',
        'year',
        'version',
        'resolution',
        'type',
        'format',
        'size',
        'path',
      ],
    },
  ],
  required: [],
});

const DownloadableFilesWidget = (props) => {
  return (
    <ObjectListWidget
      schema={ItemSchema()}
      {...props}
      value={props.value?.items || props.default?.items || []}
      onChange={(id, value) => props.onChange(id, { items: value })}
    />
  );
};

export default DownloadableFilesWidget;
