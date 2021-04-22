import React from 'react';
import CclCard from '@eea/volto-clms-theme/components/CclCard/CclCard';

import {
  SidebarPortal,
  BlocksToolbar,
  Icon,
  BlocksForm,
} from '@plone/volto/components'; // BlocksForm, Icon,
import { CardBlockSchema } from './CardBlockSchema';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';

const CclCardBlockEdit = (props) => {

  const { 
          block, 
          data, 
          onChangeBlock, 
          pathname, 
          selected, 
          manage 
        } = props;
  // console.log(props)
  let card = {
    "product": data.product,
    "description": data.description,
    "image": {
      "src":
        'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
      "alt": 'Image alt text',
    },
    "url": '/en/product-portfolio/how-our-products-are-created',
  };

  return (
    <>


      <div
      onClick={() => {
        props.setSidebarTab(1);
      }}
      aria-hidden="true">
        <CclCard type={data.cardStyle || "line"} card={card} />
      </div>

      <SidebarPortal selected={selected}>
        <InlineForm
          schema={CardBlockSchema()}
          title="Product card block"
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

export default CclCardBlockEdit;
