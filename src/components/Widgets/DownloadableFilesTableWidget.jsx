import React from 'react';
import { ReactTableWidget } from '@eeacms/volto-react-table-widget';
import { useSchema } from './SchemaCreatorWidget';
import { FormBuilder } from '@ginkgo-bioworks/react-json-schema-form-builder/dist/index';
import CclButton from '../CclButton/CclButton';
import { Segment, Loader, Header, Divider } from 'semantic-ui-react';

const orderKeysBy = (array, data) => {
  if (data) {
    return JSON.stringify(
      array.reduce((obj, key) => {
        obj[key] = data[key] || '';
        return obj;
      }, {}),
    );
  }
  return {};
};
const deleteNotExistingColumnsData = (props, schema, uiSchema) => {
  const { id, value } = props;
  const validFields = ['@id', ...Object.keys(schema?.properties)];
  for (let i in value?.items) {
    Object.keys(value?.items[i]).forEach((k) => {
      if (!validFields.includes(k)) {
        delete value?.items[i][k];
      }
    });
  }
  props.onChange(id, {
    items: value.items,
    schema,
    uiSchema,
  });
};

const fixSchema = (schema) => {
  schema.properties = Object.fromEntries(
    Object.entries(schema.properties).filter(([k, v]) => v != null && k),
  );
  schema.fieldsets[0].fields = schema.fieldsets[0].fields.filter((f) => f);
};

const DownloadableFilesTableWidget = (props) => {
  const { functions, data } = useSchema(
    props?.value?.schema,
    props?.value?.uiSchema,
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
          deactivatedFormInputs: [
            'array',
            'radio',
            'password',
            'longAnswer',
            'date',
            'dateTime',
            'time',
            'checkbox',
            'integer',
          ],
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
            fixSchema(schema);
            setEdited(false);
            setSchemaHandler(
              schema,
              uiSchema,
              props.onChange,
              props.id,
              props.value,
            );
            deleteNotExistingColumnsData(props, schema, uiSchema);
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
          value={
            [
              ...props.value?.items.map((i) =>
                JSON.parse(orderKeysBy(['@id', ...uiSchema['ui:order']], i)),
              ),
            ] ||
            props.default?.items ||
            []
          }
          onChange={(id, value) =>
            props.onChange(id, {
              ...props.value,
              items: value,
              schema: schema,
              uiSchema: uiSchema,
            })
          }
        />
      )}
      <Divider />
    </>
  );
};

export default DownloadableFilesTableWidget;
