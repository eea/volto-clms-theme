import React from 'react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import { InlineForm } from '@plone/volto/components';
import { cclButtonSchema } from './Schema';
import './styles.less';

const CclButtonBlockEdit = (props) => {
  const { block, data, onChangeBlock, selected } = props;

  return (
    <>
      <div className="ccl-block-editor-header">
        <legend
          onClick={() => {
            props.setSidebarTab(1);
          }}
          aria-hidden="true"
        >
          {data.style || 'Default'} button {data.disabled && 'disabled'}
        </legend>
      </div>

      <CclButton
        url="#"
        disabled={data.disabled}
        download={data.download}
        mode={data.style}
      >
        {data.title || 'Text example...'}
      </CclButton>

      <SidebarPortal selected={selected}>
        <InlineForm
          schema={cclButtonSchema(
            Array.isArray(data?.href) && data?.href.length
              ? ['download', 'target']
              : [],
          )}
          title="Button component block"
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

export default CclButtonBlockEdit;
