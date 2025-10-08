import React from 'react';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import { BlockDataForm } from '@plone/volto/components';
import ChatbotBannerBlockSchema from './schema';
import ChatbotBannerBlockView from './ChatbotBannerBlockView';

const ChatbotBannerBlockEdit = (props) => {
  const { block, data, onChangeBlock, selected } = props;

  return (
    <>
      <div className="block-edit-wrapper">
        <ChatbotBannerBlockView data={data} isEditMode />
      </div>

      <SidebarPortal selected={selected}>
        <BlockDataForm
          schema={ChatbotBannerBlockSchema}
          title={ChatbotBannerBlockSchema.title}
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

export default ChatbotBannerBlockEdit;
