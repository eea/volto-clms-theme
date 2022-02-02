/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';

import { SidebarPortal } from '@plone/volto/components'; // BlocksForm, Icon,
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';

import { compose } from 'redux';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { injectIntl } from 'react-intl';

import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';

import {
  LeftMenuSchema,
  cclButtonSchema,
} from '@eeacms/volto-clms-theme/components/Blocks/CclProductLeftMenu/LeftMenuSchema';
import { isEmpty } from 'lodash';
import { emptyButton, getPanels } from './utils';

const CclProductLeftMenuEdit = (props) => {
  const { block, data, onChangeBlock, selected, metadata } = props;
  const properties = isEmpty(data?.buttons?.blocks)
    ? emptyButton(2)
    : data.buttons;
  const panelData = properties;
  const panels = getPanels(panelData);
  React.useEffect(() => {
    if (isEmpty(data?.buttons)) {
      onChangeBlock(block, {
        ...data,
        buttons: {
          ...properties,
        },
      });
    }
    /* eslint-disable-next-line */
  }, []);

  const [selectedBlock, setSelectedBlock] = useState(-1);
  React.useEffect(() => {
    if (!selected) {
      setSelectedBlock(-1);
    }
  }, [selected]);

  return (
    <>
      <nav className="left-menu-detail">
        <div className="menu-detail-image">
          <img
            src={metadata?.image?.download}
            alt={metadata?.image?.filename || ''}
          />
        </div>
        {panels.map(([uid, panel], index) => (
          <div
            key={index}
            className={
              uid === selectedBlock
                ? 'block selected menu-detail-button'
                : 'menu-detail-button'
            }
            onClick={() => {
              setSelectedBlock(uid);
            }}
            onKeyDown={() => {
              setSelectedBlock(uid);
            }}
            role="button"
            tabIndex="0"
          >
            <CclButton
              url="#"
              disabled={data.buttons?.blocks[uid].disabled}
              download={data.buttons?.blocks[uid]?.download}
              mode={data.buttons?.blocks[uid].style}
            >
              {data.buttons?.blocks[uid].title || 'Text example...'}
            </CclButton>
          </div>
        ))}
      </nav>
      <SidebarPortal selected={selected && selectedBlock === -1}>
        <InlineForm
          schema={LeftMenuSchema()}
          title="Product Left Menu block"
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
        selected={selected && selectedBlock !== -1 && data.buttons?.blocks}
      >
        <InlineForm
          schema={cclButtonSchema([])}
          title="Button block"
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              buttons: {
                ...data.buttons,
                blocks: {
                  ...data.buttons.blocks,
                  [selectedBlock]: {
                    ...data.buttons.blocks[selectedBlock],
                    [id]: value,
                  },
                },
              },
            });
          }}
          formData={data.buttons?.blocks[selectedBlock]}
        />
      </SidebarPortal>
    </>
  );
};

export default compose(withObjectBrowser, injectIntl)(CclProductLeftMenuEdit);
