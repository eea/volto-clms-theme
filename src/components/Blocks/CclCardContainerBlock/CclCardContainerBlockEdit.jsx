import React from 'react';

import { SidebarPortal } from '@plone/volto/components'; // BlocksForm, Icon,
import { CardContainerSchema } from './CardContainerSchema';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';

import CclCard from '@eea/volto-clms-theme/components/CclCard/CclCard';

import './styles.less';
/*
import { Button } from 'semantic-ui-react';
import { isEmpty, without } from 'lodash';
import {
  emptyBlocksForm,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';
import {
    getCards,
  defaultNewCard,
} from './utils';

import tuneSVG from '@plone/volto/icons/column.svg';
*/

const CclCardContainerBlockEdit = (props) => {
  const { block, data, onChangeBlock, pathname, selected, manage } = props;
  // console.log(props)
  const card = {
    title: 'Dataset preview title',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus mauris ante, a iaculis leo placerat quis. Nullam vitae vulputate leo, et ultricies dolor.',
    image: {
      src:
        'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
      alt: 'Image alt text',
    },
    absolute_url: '/en/product-portfolio/how-our-products-are-created',
  };

  return (
    <>
      <div
        className="cardContainer-header"
        onClick={() => {
          props.setSidebarTab(1);
        }}
        aria-hidden="true"
      >
        {data.title || 'Card container'}
      </div>
      {data.customCards ? (
        'Add a custom card'
      ) : (
        <div className="card-container">
          <CclCard type={data.cardStyle || 'line'} card={card} />
          <CclCard type={data.cardStyle || 'line'} card={card} />
        </div>
      )}
      <SidebarPortal selected={selected}>
        <InlineForm
          schema={CardContainerSchema()}
          title="Card container block"
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

export default CclCardContainerBlockEdit;
