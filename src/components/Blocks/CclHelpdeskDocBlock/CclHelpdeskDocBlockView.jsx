import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import { HelpdeskForm } from './HelpdeskForm';
import { toast } from 'react-toastify';
import { Toast } from '@plone/volto/components';
const CclHelpdeskDocView = (props) => {
  const { data } = props;
  const [file, setFile] = React.useState('');
  const [endpoint, setEndpoint] = React.useState('');
  const [result, setResult] = React.useState('');
  const [fields, setFields] = React.useState({});

  const reEndpoint = /\/api\/(@.*)\?/;
  const reParams = /(?=&?)(\w*=[a-zA-Z0-9-]*)/gm;
  React.useEffect(() => {
    data.url &&
      fetch(data.url)
        .then((response) => response.text())
        .then((data) => setFile(data));
    return () => {};
  }, [data.url]);

  React.useEffect(() => {
    if (file) {
      const endpoint = file.match(reEndpoint);
      if (endpoint[1]) {
        setEndpoint(endpoint[1]);
      }

      const params = file.match(reParams);
      if (params) {
        const fields = params.map((p) => {
          const s = p.split('=');
          return {
            key: s[0],
            value: s[1],
          };
        });
        setFields(fields);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <div>
      {data.title && <h2>{data.title}</h2>}
      <h2>Endpoint:</h2>
      <h3>{endpoint}</h3>
      <Segment color="teal" padded>
        {file.split('\n').map((line, key) => (
          <React.Fragment key={key}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </Segment>

      <Segment color="teal" padded>
        <HelpdeskForm
          fields={fields}
          endpoint={endpoint}
          setResult={setResult}
        ></HelpdeskForm>
      </Segment>
      {result && (
        <>
          <Segment color="teal" padded>
            <h2>Endpoint result:</h2>
            <Icon
              color={'olive'}
              name="copy"
              size="large"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigator.clipboard.writeText(result);
                toast.success(
                  <Toast
                    success
                    autoClose={5000}
                    title={'URL copied to clipboard'}
                    content={`The result URL has been successfully copied to clipboard`}
                  />,
                );
              }}
            ></Icon>
            <br />
            <br />
            {JSON.stringify(result)}
          </Segment>
        </>
      )}
    </div>
  );
};

export default CclHelpdeskDocView;
