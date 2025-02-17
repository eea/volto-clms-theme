import React, { useState, useEffect } from 'react';
import { SidebarPortal, BlockDataForm } from '@plone/volto/components';
import { CardBlockSchema, CardContainerSchema } from './schema';
import { isEmpty } from 'lodash';
import { emptyCard, getPanels } from '../utils';
import FamilyCard from './FamilyCard';

const CclFamiliesListingEdit = (props) => {
  const { block, data, onChangeBlock, selected, setSidebarTab, intl } = props;
  const [selectedCardBlock, setSelectedCardBlock] = useState(-1);

  let schema = CardContainerSchema();
  const properties = isEmpty(data?.customCards?.blocks)
    ? emptyCard(2)
    : data.customCards;

  const panelData = properties;
  const panels = getPanels(panelData);
  useEffect(() => {
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
        {data.title || 'Family card container'}
      </div>
      <div className={'card-container'}>
        <>
          {panels.map(([uid, panel], index) => (
            <FamilyCard
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
      <SidebarPortal
        selected={
          selected && selectedCardBlock !== -1 && data.customCards?.blocks
        }
      >
        <BlockDataForm
          schema={CardBlockSchema()}
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
        />
      </SidebarPortal>
    </>
  );
};

export default CclFamiliesListingEdit;
