import React from 'react';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import { InlineForm } from '@plone/volto/components';
import schema from './schema';
import CclHelpdeskDocView from './CclHelpdeskDocBlockView';

const CclHelpdeskDocEdit = (props) => {
  const { block, data, onChangeBlock, selected } = props;
  return (
    <>
      <CclHelpdeskDocView data={data} />
      <SidebarPortal selected={selected}>
        <InlineForm
          schema={schema}
          title={schema.title}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
        />
      </SidebarPortal>
    </>
  );
};

export default CclHelpdeskDocEdit;
