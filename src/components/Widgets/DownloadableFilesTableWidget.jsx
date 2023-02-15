import React from 'react';
import { ReactTableWidget } from '@eeacms/volto-react-table-widget';
import { useSchema } from './SchemaCreatorWidget';
import { FormBuilder } from '@ginkgo-bioworks/react-json-schema-form-builder/dist/index';
import CclButton from '../CclButton/CclButton';
import './DownloadableFilesTableWidget.less';

const DownloadableFilesTableWidget = (props) => {
  const { functions, data } = useSchema();
  const { schema, uiSchema, ready } = data;
  const { setSchema, setUISchema, setSchemaHandler } = functions;

  return (
    <>
      <div className="ui container">
        <label className="downloadable-files-editor-title">{props.title}</label>
      </div>
      <FormBuilder
        schema={JSON.stringify(schema)}
        uischema={JSON.stringify(uiSchema)}
        onChange={(newSchema, newUiSchema) => {
          let parsed_newSchema = JSON.parse(newSchema);
          parsed_newSchema.fieldsets[0].fields = JSON.parse(newUiSchema)[
            'ui:order'
          ];
          setSchema(parsed_newSchema);
          setUISchema(JSON.parse(newUiSchema));
        }}
      />
      <div className="ui container">
        <CclButton
          onClick={() => {
            setSchemaHandler(schema);
          }}
        >
          Reload table schema
        </CclButton>
      </div>
      {ready && (
        <ReactTableWidget
          {...props}
          schema={schema}
          csvexport={true}
          csvimport={true}
          value={props.value?.items || props.default?.items || []}
          onChange={(id, value) => props.onChange(id, { items: value })}
        />
      )}
    </>
  );
};

export default DownloadableFilesTableWidget;
