import { CardBlockSchema, CardContainerSchema } from './CardContainerSchema';
import React, { useState } from 'react';
import { emptyCard, getPanels } from '../utils';

import CclCard from '@eeacms/volto-clms-theme/components/CclCard/CclCard';
import { SidebarPortal, BlockDataForm } from '@plone/volto/components'; // BlocksForm, Icon,
import { addExtensionFieldToSchema } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { isEmpty } from 'lodash';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import CclImageEditor from '@eeacms/volto-clms-theme/components/CclImageEditor/CclImageEditor';
import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';
import getListingBodyVariation from './utils.js';

const messages = defineMessages({
  template: {
    id: 'Variation',
    defaultMessage: 'Variation',
  },
});

const CclCardContainerBlockEdit = ({
  block,
  data,
  onChangeBlock,
  selected,
  editable,
  request,
  content,
  setSidebarTab,
  openObjectBrowser,
  pathname,
  intl,
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

  schema = addExtensionFieldToSchema({
    schema,
    name: 'variation',
    items: config.blocks.blocksConfig.listing.variations,
    intl,
    title: { id: intl.formatMessage(messages.template) },
  });

  const variation = getListingBodyVariation(data);
  let containerClass = '';
  if (['news', 'event'].includes(variation.templateID)) {
    containerClass = 'ccl-container';
  } else if (!['line', 'doc', 'globalSearch'].includes(variation.templateID)) {
    containerClass = 'card-container';
  }

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
        {data.title || 'Card container'}
      </div>
      <div className={containerClass}>
        {panels.map(([uid, panel], index) => (
          <CclCard
            key={index}
            type={variation?.templateID || 'doc'}
            card={panel}
            onClickImage={() => {
              setSelectedCardBlock(uid);
            }}
            isCustomCard={true}
            CclImageEditor={
              <CclImageEditor
                block={block}
                content={content}
                data={data}
                editable={editable}
                imageUrl={panel?.image?.url}
                onChangeBlock={onChangeBlock}
                openObjectBrowser={openObjectBrowser}
                pathname={pathname}
                request={request}
                selected={selected}
                selectedCardBlock={selectedCardBlock}
                setSelectedCardBlock={setSelectedCardBlock}
                uid={uid}
              />
            }
          />
        ))}
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

export default compose(
  withObjectBrowser,
  injectIntl,
)(CclCardContainerBlockEdit);
