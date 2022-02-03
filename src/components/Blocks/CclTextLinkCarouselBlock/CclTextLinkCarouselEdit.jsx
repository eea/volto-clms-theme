import React from 'react';

import { SidebarPortal } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { TextLinkCarouselSchema } from './TextLinkCarouselSchema';

const TextLinkCarouselEdit = (props) => {
  const { block, data, onChangeBlock, selected } = props;

  return (
    <>
      {data?.textLink?.items.map((item, index) => (
        <div className="text-link-carousel-block" key={index}>
          {item.text}
        </div>
      ))}
      <SidebarPortal selected={selected}>
        <InlineForm
          schema={TextLinkCarouselSchema()}
          title="Home text link carousel"
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
export default TextLinkCarouselEdit;
