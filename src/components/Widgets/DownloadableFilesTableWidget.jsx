import React from 'react';
import { ReactTableWidget } from '@codesyntax/volto-react-table-widget';

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
      minimum: 1900,
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
    source: {
      title: 'Source',
      description: 'Enter the source of this file (this is an internal).',
      choices: [
        ['EEA', 'EEA'],
        ['HOTSPOTS', 'HOTSPOTS'],
      ],
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
        'source',
      ],
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
