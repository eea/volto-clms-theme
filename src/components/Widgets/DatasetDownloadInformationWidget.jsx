import React from 'react';
import ObjectListWidget from '@plone/volto/components/manage/Widgets/ObjectListWidget';

const ItemSchema = () => ({
  title: 'Dataset Download Information',
  properties: {
    name: {
      title: 'Type',
      description: '',
      type: 'string',
    },
    collection: {
      title: 'Collection',
      description: '',
      type: 'string',
    },
    full_path: {
      title: 'Enter the path to the full dataset download file',
      description:
        'This is used when requesting the download from the map viewer',
      type: 'string',
    },
    full_format: {
      title: 'Enter the format of the full dataset file',
      description: '',
      choices: [
        ['Shapefile', 'Shapefile'],
        ['GDB', 'GDB'],
        ['GPKG', 'GPKG'],
        ['Geojson', 'Geojson'],
        ['Geotiff', 'Geotiff'],
        ['Netcdf', 'Netcdf'],
        ['GML', 'GML'],
        ['WFS', 'WFS'],
      ],
    },
    full_source: {
      title: 'Enter the source of the full dataset file',
      description: '',
      choices: [
        ['WEKEO', 'WEKEO'],
        ['EEA', 'EEA'],
        ['LANDCOVER', 'LANDCOVER'],
        ['LEGACY', 'LEGACY'],
      ],
    },
    wekeo_choices: {
      title: 'WEKEO choices',
      description: '',
      type: 'string',
    },
    layers: {
      title: 'Layers / Bands',
      description:
        'Some datasets provide options to download specific layers. Write here the layer names, one per line',
      type: 'string',
      widget: 'token',
    },
  },
  fieldsets: [
    {
      id: 'default',
      title: 'File',
      fields: [
        'name',
        'collection',
        'full_path',
        'full_format',
        'full_source',
        'wekeo_choices',
        'layers',
      ],
    },
  ],
  required: [],
});

const DatasetDownloadInformationWidget = (props) => {
  return (
    <ObjectListWidget
      schema={ItemSchema()}
      {...props}
      value={props.value?.items || props.default?.items || []}
      onChange={(id, value) => props.onChange(id, { items: value })}
    />
  );
};

export default DatasetDownloadInformationWidget;
