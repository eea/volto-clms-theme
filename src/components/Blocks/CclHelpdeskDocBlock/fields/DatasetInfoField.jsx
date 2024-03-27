import { useSelector } from 'react-redux';
import Select from 'react-select';
import { Segment } from 'semantic-ui-react';

import { FormFieldWrapper } from '@plone/volto/components';

export const DatasetInfoField = ({
  label,
  formData,
  dependant,
  setFormData,
}) => {
  const id = 'helpdesk-block';
  const search = useSelector((state) => state.search.subrequests[id]);
  const valueItems = dependant ? JSON.parse(dependant.split('===')[1]) : [];
  const options = valueItems.map((v) => {
    return {
      value: v['@id'],
      label: `${v.name ?? ''} ${v.collection ?? ''} ${v.full_source ?? ''} ${
        typeof v.full_format === 'object'
          ? v.full_format.title ?? ''
          : v.full_format ?? ''
      }`,
    };
  });
  return (
    <FormFieldWrapper title={`${label}:`} id={label} className="text">
      <Segment basic loading={search?.loading}>
        <Select
          type="text"
          options={options}
          onChange={(e) => {
            setFormData({ ...formData, [label]: e.value });
          }}
        />
      </Segment>
    </FormFieldWrapper>
  );
};
