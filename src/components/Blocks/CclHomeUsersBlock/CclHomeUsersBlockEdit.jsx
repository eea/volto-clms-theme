import './styles.less';

import { CardBlockSchema, HomeUsersSchema } from './HomeUsersSchema';
/** upload image */
import { InlineForm, SidebarPortal } from '@plone/volto/components';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { emptyCard, getPanels } from '../utils';

import { compose } from 'redux';
import { createContent } from '@plone/volto/actions';
import { isEmpty } from 'lodash';
import CclImageEditor from '@eeacms/volto-clms-theme/components/CclImageEditor/CclImageEditor';

function isBlockEdit(selected, selectedCardBlock) {
  return selected && selectedCardBlock === -1;
}

function isCardEdit(selected, blocks, selectedCardBlock) {
  return selected && blocks && selectedCardBlock !== -1;
}

const CclHomeUsersBlockEdit = ({
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
}) => {
  const properties = isEmpty(data?.customCards?.blocks)
    ? emptyCard(4)
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

  return (
    <>
      <div
        className="homeUsers-header"
        onClick={() => {
          setSidebarTab(1);
          setSelectedCardBlock(-1);
        }}
        aria-hidden="true"
      >
        {data.title}
      </div>
      <div>
        <div className={'line'}>
          {panels.map(([uid, panel], index) => (
            <div
              key={index}
              className={uid === selectedCardBlock && 'block selected'}
              onClick={() => {
                setSelectedCardBlock(uid);
              }}
              onKeyDown={() => {
                setSelectedCardBlock(uid);
              }}
              role="button"
              tabIndex="0"
            >
              <div className="card-line">
                <div className="card-image">
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
                </div>
                <div className={'card-text'}>
                  <div className="card-title">{panel?.title}</div>
                  <div className="card-description">{panel?.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SidebarPortal selected={isBlockEdit(selected, selectedCardBlock)}>
        <InlineForm
          schema={HomeUsersSchema()}
          title="Home users block"
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
        selected={isCardEdit(
          selected,
          data.customCards?.blocks,
          selectedCardBlock,
        )}
      >
        <InlineForm
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
  connect(
    (state) => ({
      request: state.content.create,
      content: state.content.data,
    }),
    { createContent },
  ),
)(CclHomeUsersBlockEdit);
