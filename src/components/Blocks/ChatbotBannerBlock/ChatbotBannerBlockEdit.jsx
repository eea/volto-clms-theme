import React from 'react';
import { BlockDataForm } from '@plone/volto/components';
import ChatbotBannerBlockSchema from './schema';
import ChatbotBannerBlockView from './ChatbotBannerBlockView';

const ChatbotBannerBlockEdit = (props) => {
  const { data, block, onChangeBlock } = props;

  return (
    <div className="block-edit-wrapper">
      <ChatbotBannerBlockView data={data} isEditMode />
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
    </div>
  );
};

export default ChatbotBannerBlockEdit;
