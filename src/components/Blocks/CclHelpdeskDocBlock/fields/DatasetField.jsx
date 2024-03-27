import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { Segment } from 'semantic-ui-react';

import { searchContent } from '@plone/volto/actions';
import { FormFieldWrapper } from '@plone/volto/components';

export const DatasetField = ({
  label,
  setDependant,
  formData,
  setFormData,
}) => {
  const id = 'helpdesk-block';
  const separator = '===';
  const search = useSelector((state) => state.search.subrequests[id]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(
      searchContent(
        '/',
        {
          portal_type: 'DataSet',
          metadata_fields: ['dataset_download_information', 'UID'],
          b_size: 9999,
        },
        id,
      ),
    );
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <FormFieldWrapper title={`${label}:`} id={label} className="text">
      <Segment basic loading={search?.loading}>
        <Select
          type="text"
          onChange={(e) => {
            setDependant(e.value);
            setFormData({ ...formData, [label]: e.value.split(separator)[0] });
          }}
          options={
            search?.items
              ? search?.items.map((i) => {
                  return {
                    value: `${i.UID}${separator}${JSON.stringify(
                      i.dataset_download_information?.items,
                    )}`,
                    label: i.title,
                  };
                })
              : []
          }
        />
      </Segment>
    </FormFieldWrapper>
  );
};
