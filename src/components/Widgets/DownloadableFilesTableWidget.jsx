import React from 'react';
import { ReactTableWidget } from '@eeacms/volto-react-table-widget';
import { useSchema } from './SchemaCreatorWidget';
import { FormBuilder } from '@ginkgo-bioworks/react-json-schema-form-builder/dist/index';
import CclButton from '../CclButton/CclButton';
import { Segment, Loader, Header, Divider } from 'semantic-ui-react';
import './DownloadableFilesTableWidget.less';

const DownloadableFilesTableWidget = (props) => {
  const { functions, data } = useSchema(
    props.value.schema,
    props.value.uiSchema,
  );
  const { schema, uiSchema, ready } = data;
  const { setSchema, setUISchema, setSchemaHandler } = functions;
  const [edited, setEdited] = React.useState(false);

  return (
    <>
      <div className="ui container">
        <label className="downloadable-files-editor-title">{props.title}</label>
      </div>
      {edited && (
        <Segment
          color="red"
          inverted
          className="schema-modification-alert-message"
        >
          <strong>
            You have modified the schema, if you don't apply the changes, they
            will be lost!
          </strong>
        </Segment>
      )}
      <FormBuilder
        schema={JSON.stringify(schema)}
        uischema={JSON.stringify(uiSchema)}
        className={edited ? 'edited-schema' : ''}
        onChange={(newSchema, newUiSchema) => {
          setEdited(true);
          let parsed_newSchema = JSON.parse(newSchema);
          parsed_newSchema.fieldsets[0].fields = JSON.parse(newUiSchema)[
            'ui:order'
          ];
          setSchema(parsed_newSchema);
          setUISchema(JSON.parse(newUiSchema));
        }}
        mods={{
          customFormInputs,
          deactivatedFormInputs: ['array', 'radio', 'password', 'longAnswer'],
        }}
      />
      {edited && (
        <Segment
          color="red"
          inverted
          className="schema-modification-alert-message"
        >
          <strong>
            You have modified the schema, if you don't apply the changes, they
            will be lost!
          </strong>
        </Segment>
      )}
      <div className="ui container">
        <CclButton
          onClick={() => {
            setEdited(false);
            setSchemaHandler(
              schema,
              uiSchema,
              (id, schema, uiSchema) =>
                props.onChange(id, {
                  ...props.value,
                  schema: schema,
                  uiSchema: uiSchema,
                }),
              props.id,
            );
          }}
        >
          APPLY MODIFIED SCHEMA
        </CclButton>
      </div>
      {!ready && (
        <Segment placeholder>
          <Loader active inline="centered" />
          <Segment.Inline>
            <Header textAlign="centered">Applying the new schema...</Header>
          </Segment.Inline>
        </Segment>
      )}
      {ready && (
        <ReactTableWidget
          {...props}
          schema={schema}
          csvexport={true}
          csvimport={true}
          value={props.value?.items || props.default?.items || []}
          onChange={(id, value) =>
            props.onChange(id, { ...props.value, items: value })
          }
        />
      )}
      <Divider />
    </>
  );
};

export default DownloadableFilesTableWidget;
