import React from 'react';
import CclCard from '@eeacms/volto-clms-theme/components/CclCard/CclCard';

import { SidebarPortal } from '@plone/volto/components';
import { CardBlockSchema } from './CardBlockSchema';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';

const CclCardBlockEdit = (props) => {
  const { block, data, onChangeBlock, selected } = props;

  let card = {
    product: data.title,
    description: data.description,
    image: {
      scales: {
        icon: {
          download:
            'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
        },
        large: {
          download:
            'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
        },
        listing: {
          download:
            'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
        },
        mini: {
          download:
            'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
        },
        preview: {
          download:
            'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
        },
        thumb: {
          download:
            'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
        },
        tile: {
          download:
            'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
        },
      },
    },
    url: data.url,
  };
  console.log(data);

  return (
    <>
      <div
        onClick={() => {
          props.setSidebarTab(1);
        }}
        aria-hidden="true"
      >
        <CclCard type={data.cardStyle || 'line'} card={card} />
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
