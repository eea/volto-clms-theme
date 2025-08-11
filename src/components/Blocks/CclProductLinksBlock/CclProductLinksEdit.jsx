import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';

import { SidebarPortal, BlockDataForm } from '@plone/volto/components'; // BlocksForm, Icon,
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

import { emptyCard, getPanels } from '../utils';
import { CardBlockSchema, CardContainerSchema } from './schema';

import { isEmpty } from 'lodash';
import ProductLink from './ProductLink.jsx';

const CclProductLinksEdit = ({
  block,
  data,
  onChangeBlock,
  selected,
  setSidebarTab,
}) => {
  const properties = isEmpty(data?.customCards?.blocks)
    ? emptyCard(2)
    : data.customCards;

  const panelData = properties;
  const panels = getPanels(panelData);
  React.useEffect(() => {
    if (isEmpty(data?.customCards)) {
      onChangeBlock(block, {
        ...data,
        customCards: {
          ...properties,
        },
      });
    }
    /* eslint-disable-next-line */
  }, []);

  const [selectedCardBlock, setSelectedCardBlock] = useState(-1);

  let schema = CardContainerSchema();
  let cardSchema = CardBlockSchema();

  return (
    <>
      <div
        className="cardContainer-header"
        onClick={() => {
          setSidebarTab(1);
          setSelectedCardBlock(-1);
        }}
        aria-hidden="true"
      >
        {data.title || 'Product links container'}
      </div>
      <div className={'product-column-links'}>
        <>
          {panels.map(([uid, panel], index) => (
            <ProductLink
              key={index}
              card={panel}
              onClickImage={() => {
                setSelectedCardBlock(uid);
              }}
              isCustomCard={true}
              isEditMode
            />
          ))}
        </>
      </div>
      <SidebarPortal selected={selected && selectedCardBlock === -1}>
        <BlockDataForm
          schema={schema}
          title="Product Link container block"
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
      <SidebarPortal
        selected={
          selected && selectedCardBlock !== -1 && data.customCards?.blocks
        }
      >
        <BlockDataForm
          schema={cardSchema}
          title="Card block"
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              customCards: {
                ...data.customCards,
                blocks: {
                  ...data.customCards.blocks,
                  [selectedCardBlock]: {
                    ...data.customCards.blocks[selectedCardBlock],
                    [id]: value,
                  },
                },
              },
            });
          }}
          formData={data.customCards?.blocks[selectedCardBlock]}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </>
  );
};

export default compose(withObjectBrowser, injectIntl)(CclProductLinksEdit);
