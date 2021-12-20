import { getFormatConversionTable, getProjections } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

import ObjectListWidget from '@plone/volto/components/manage/Widgets/ObjectListWidget';
import React from 'react';

const ItemSchema = (format_choices, projection_choices) => ({
  title: 'Downloadable File',
  properties: {
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
      choices: format_choices,
    },
    projection: {
      title: 'Projection',
      description: 'Enter the projection of this file.',
      choices: projection_choices,
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
    source: {
      title: 'Source',
      description: 'Enter the source of this file.',
      type: 'string',
      // controlled vocabulary: values to be provided by the user
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
        'area',
        'year',
        'resolution',
        'type',
        'format',
        'projection',
        'version',
        'size',
        'source',
        'path',
      ],
    },
  ],
  required: [],
});

const DownloadableFilesWidget = (props) => {
  // format_conversion_table_in_progress
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getFormatConversionTable());
    dispatch(getProjections());
  }, [dispatch]);
  const format_conversion_table_in_progress = useSelector(
    (state) => state.downloadtool.format_conversion_table_in_progress,
  );
  const projections_in_progress = useSelector(
    (state) => state.downloadtool.projections_in_progress,
  );
  let format_choices = Object.keys(
    format_conversion_table_in_progress,
  ).map((key) => [key, key]);
  let projection_choices = [];
  if (projections_in_progress.length > 0) {
    projection_choices = projections_in_progress.map((key) => [key, key]);
  }
  return (
    <ObjectListWidget
      schema={ItemSchema(format_choices, projection_choices)}
      {...props}
      value={props.value?.items || props.default?.items || []}
      onChange={(id, value) => props.onChange(id, { items: value })}
    />
  );
};

export default DownloadableFilesWidget;
