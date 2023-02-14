import { useState } from 'react';
export const useSchema = () => {
  const [schema, setSchema] = useState({
    type: 'object',
    title: 'Downloadable File',
    properties: {
      title: {
        title: 'Title',
        type: 'string',
        description: 'Enter the title of this file.',
      },
      file: {
        title: 'File',
        type: 'string',
        description: 'Enter the file name.',
      },
      area: {
        title: 'Area of interest',
        type: 'string',
        description: 'Enter the area of this file.',
      },
      year: {
        title: 'Year',
        type: 'number',
        minimum: 1900,
        exclusiveMinimum: null,
        description: 'Enter the year of this file.',
      },
      version: {
        title: 'Version',
        type: 'string',
        description: 'Enter the version of this file.',
      },
      resolution: {
        title: 'Resolution',
        type: 'string',
        description: 'Enter the resolution of this file. Ex: 100m',
      },
      type: {
        enum: ['Raster', 'Vector'],
        title: 'Type',
        type: 'string',
      },
      format: {
        title: 'Format',
        type: 'string',
        description: 'Enter the format of this file.',
      },
      size: {
        title: 'Size',
        type: 'string',
        description: 'Enter the size of this file. Ex: 3.5GB',
      },
      path: {
        title: 'Path',
        type: 'string',
        description: 'Enter the absolute path of this file in the storage',
      },
      source: {
        enum: ['EEA', 'HOTSPOTS'],
        title: 'Source',
        type: 'string',
      },
    },
    dependencies: {},
    required: [],
    fieldsets: [
      {
        id: 'default',
        title: 'File',
        fields: [
          'title',
          'file',
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
  });

  const [ready, setReady] = useState(true);
  function setSchemaHandler(schema) {
    setReady(false);
    setTimeout(() => setSchema(schema), 1000);
    setTimeout(() => setReady(true), 1500);
  }

  const [uiSchema, setUISchema] = useState({
    'ui:order': [
      'title',
      'file',
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
  });

  return {
    functions: {
      setSchema,
      setSchemaHandler,
      setUISchema,
    },
    data: {
      ready,
      schema,
      uiSchema,
    },
  };
};
