import React from 'react';
import { Form } from 'semantic-ui-react';

import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';

import { getWidget } from './utils';

export const HelpdeskForm = ({ fields, endpoint, setResult }) => {
  const [datasetInfo, setDatasetInfo] = React.useState(null);
  const [formData, setFormData] = React.useState({});
  return fields.length > 0 ? (
    <>
      <h2>Form to test the endpoint:</h2>
      <Form>
        {fields.map((f, key) => {
          const Field = getWidget(f.key);
          return (
            <Field
              key={key}
              label={f.key}
              placeholder={f.value}
              dependant={datasetInfo}
              setDependant={setDatasetInfo}
              formData={formData}
              setFormData={setFormData}
            />
          );
        })}
        <CclButton
          onClick={() => {
            fetch(
              `/++api++/${endpoint}?${Object.keys(formData)
                .map((k) => `${k}=${formData[k]}`)
                .join('&')}`,
            )
              .then((response) => response.json())
              .then((data) => setResult(data));
          }}
        >
          Send request
        </CclButton>
      </Form>
    </>
  ) : (
    <></>
  );
};
