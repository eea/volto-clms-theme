import React, { useState } from 'react';
import { HomeUsersSchema } from './HomeUsersSchema';
import { SidebarPortal } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { isEmpty } from 'lodash';
import { emptyCard, getPanels } from './utils';
import CclCard from '@eeacms/volto-clms-theme/components/CclCard/CclCard';
import { CardBlockSchema } from '../CclCardBlock/CardBlockSchema';
import './styles.less';

const CclHomeUsersBlockEdit = (props) => {
  const { block, data, onChangeBlock, selected } = props;
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
  React.useEffect(() => {
    if (!selected) {
      setSelectedCardBlock(-1);
    }
  }, [selected]);
  return (
    <>
      <div
        className="homeUsers-header"
        onClick={() => {
          props.setSidebarTab(1);
          setSelectedCardBlock(-1);
        }}
        aria-hidden="true"
      >
        {data.title || 'Home Users band'}
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
              <CclCard type={'line'} card={panel} />
            </div>
          ))}
        </div>
      </div>
      <SidebarPortal selected={selected && selectedCardBlock === -1}>
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
        selected={
          selected && selectedCardBlock !== -1 && data.customCards?.blocks
        }
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
export default CclHomeUsersBlockEdit;
