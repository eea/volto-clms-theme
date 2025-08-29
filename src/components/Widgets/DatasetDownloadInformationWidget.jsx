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
    byoc_collection: {
      title: 'BYOC Collection',
      description:
        'To download the datasets via CDSE, it is necessary to include a BYOC identifier. Example: 3fdh95a1-rc49-4676-b285-c1d00g4bag1a',
      type: 'string',
    },
    full_path: {
      title: 'Enter the path to the full dataset download file',
      description:
        'This is used when requesting the download from the data viewer',
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
      title: 'Enter the data source',
      description: '',
      choices: [
        ['CDSE', 'CDSE'],
        ['WEKEO', 'WEKEO'],
        ['EEA', 'EEA'],
        ['LANDCOVER', 'LANDCOVER'],
        ['LEGACY', 'LEGACY'],
        ['HOTSPOTS', 'HOTSPOTS'],
        ['VITO_geotiff', 'VITO_geotiff'],
        ['VITO_Geotiff_LandCover', 'VITO_Geotiff_LandCover'],
        ['VITO_Geotiff_LSP', 'VITO_Geotiff_LSP'],
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
        'byoc_collection',
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
