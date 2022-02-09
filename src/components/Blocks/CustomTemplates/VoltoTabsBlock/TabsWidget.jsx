import './fontawesome';

import {
  DragDropList,
  FormFieldWrapper,
  Icon,
  SidebarPopup,
} from '@plone/volto/components';
import { Grid, Header } from 'semantic-ui-react';
import { faExternalLinkAlt, faIcons } from '@fortawesome/free-solid-svg-icons';
import { omit, without } from 'lodash';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import React from 'react';
import { StyleWrapperEdit } from '@eeacms/volto-block-style/StyleWrapper';
import clearSVG from '@plone/volto/icons/clear.svg';
import dragSVG from '@plone/volto/icons/drag.svg';
import { emptyTab } from '@eeacms/volto-tabs-block/helpers';
import { fontAwesomeSchema } from './fontAwesomeSchema';
import leftMenuSVG from '@plone/volto/icons/nav.svg';
import move from 'lodash-move';
import plusSVG from '@plone/volto/icons/circle-plus.svg';
import rightSVG from '@plone/volto/icons/right-key.svg';
import { subTabSchema } from './subTabSchema';
import themeSVG from '@plone/volto/icons/theme.svg';
import trashSVG from '@plone/volto/icons/delete.svg';
import { v4 as uuid } from 'uuid';

export function moveColumn(formData, source, destination) {
  return {
    ...formData,
    blocks_layout: {
      items: move(formData.blocks_layout?.items, source, destination),
    },
  };
}

const empty = () => {
  return [uuid(), emptyTab()];
};

const TabsWidget = (props) => {
  const [blockStyleVisible, setBlockStyleVisible] = React.useState(false);
  const [activeTabId, setActiveTabId] = React.useState(0);
  const [activeFontAwesomePopup, setActiveFontAwesomePopup] = React.useState(0);
  const [activeSubTabPopup, setActiveSubTabPopup] = React.useState(0);

  const { value = {}, id, onChange } = props;
  const { blocks = {} } = value;
  const tabsList = (value.blocks_layout?.items || []).map((tabId) => [
    tabId,
    blocks[tabId],
  ]);
  const activeTabData = blocks[activeTabId] || {};
  return (
    <FormFieldWrapper
      {...props}
      draggable={false}
      className="drag-drop-list-widget"
    >
      <div className="tabs-area">
        <DragDropList
          childList={tabsList}
          onMoveItem={(result) => {
            const { source, destination } = result;
            if (!destination) {
              return;
            }
            const newFormData = moveColumn(
              value,
              source.index,
              destination.index,
            );
            onChange(id, newFormData);
            return true;
          }}
        >
          {(dragProps) => {
            const { childId, child, index, draginfo } = dragProps;
            return (
              <div ref={draginfo.innerRef} {...draginfo.draggableProps}>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      visibility: 'visible',
                      display: 'inline-block',
                    }}
                    {...draginfo.dragHandleProps}
                    className="drag handle wrapper"
                  >
                    <Icon name={dragSVG} size="18px" />
                  </div>
                  <div className="tab-area">
                    <div
                      className="label"
                      style={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        maxWidth: '65%',
                      }}
                    >
                      {child.subTab?.subtab === true && (
                        <Icon name={rightSVG} size="18px" />
                      )}
                      {child.title || `Tab ${index + 1}`}
                    </div>
                    <button
                      onClick={() => {
                        setActiveTabId(childId);
                        setBlockStyleVisible(true);
                      }}
                      title="Apply style"
                    >
                      <Icon name={themeSVG} size="18px" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTabId(childId);
                        setActiveFontAwesomePopup(true);
                      }}
                      title="Add icon"
                    >
                      <FontAwesomeIcon icon={faIcons} />
                    </button>

                    <SidebarPopup open={activeFontAwesomePopup}>
                      <InlineForm
                        schema={fontAwesomeSchema()}
                        title={
                          <>
                            {fontAwesomeSchema().title}
                            <button
                              onClick={() => {
                                setActiveFontAwesomePopup(false);
                              }}
                              style={{ float: 'right' }}
                            >
                              <Icon name={clearSVG} size="24px" />
                            </button>
                          </>
                        }
                        footer={
                          <div
                            className="inline field help"
                            style={{
                              marginTop: '10px',
                              marginBottom: '10px',
                            }}
                          >
                            <Grid>
                              <Grid.Row stretched>
                                <Grid.Column width={12}>
                                  <Header as="h2">
                                    Selected icon:
                                    {value?.blocks?.[activeTabId]?.icon
                                      ?.fontAwesome ? (
                                      <FontAwesomeIcon
                                        icon={[
                                          'far',
                                          value?.blocks?.[activeTabId]?.icon
                                            ?.fontAwesome,
                                        ]}
                                        style={{ marginLeft: '1rem' }}
                                      />
                                    ) : (
                                      ' None'
                                    )}
                                  </Header>
                                </Grid.Column>
                              </Grid.Row>
                              <Grid.Row stretched>
                                <Grid.Column width={12}>
                                  <a
                                    href="https://fontawesome.com/icons?d=gallery&p=2&s=regular&m=free"
                                    rel="noreferrer"
                                    target="_blank"
                                  >
                                    Font Awesome (regular) icons gallery{' '}
                                    <FontAwesomeIcon
                                      icon={faExternalLinkAlt}
                                      style={{ marginLeft: '1rem' }}
                                    />
                                  </a>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </div>
                        }
                        formData={{
                          ...activeTabData?.icon,
                        }}
                        onChangeField={(idTab, formValue) => {
                          onChange(id, {
                            ...value,
                            blocks: {
                              ...value.blocks,
                              [activeTabId]: {
                                ...(activeTabData || {}),
                                icon: {
                                  ...activeTabData?.icon,
                                  [idTab]: formValue,
                                },
                              },
                            },
                          });
                        }}
                      />
                    </SidebarPopup>

                    <button
                      onClick={() => {
                        setActiveTabId(childId);
                        setActiveSubTabPopup(true);
                      }}
                      title="Sub Tab"
                    >
                      <Icon size={'24px'} name={leftMenuSVG} />
                    </button>
                    <SidebarPopup open={activeSubTabPopup}>
                      <InlineForm
                        schema={subTabSchema()}
                        title={
                          <>
                            {subTabSchema().title}
                            <button
                              onClick={() => {
                                setActiveSubTabPopup(false);
                              }}
                              style={{ float: 'right' }}
                            >
                              <Icon name={clearSVG} size="24px" />
                            </button>
                          </>
                        }
                        formData={{
                          ...activeTabData?.subTab,
                        }}
                        onChangeField={(idTab, formValue) => {
                          onChange(id, {
                            ...value,
                            blocks: {
                              ...value.blocks,
                              [activeTabId]: {
                                ...(activeTabData || {}),
                                subTab: {
                                  ...activeTabData?.subTab,
                                  [idTab]: formValue,
                                },
                              },
                            },
                          });
                        }}
                      />
                    </SidebarPopup>

                    {value.blocks_layout?.items?.length > 1 ? (
                      <button
                        onClick={() => {
                          const newFormData = {
                            ...value,
                            blocks: omit({ ...value.blocks }, [childId]),
                            blocks_layout: {
                              ...value.blocks_layout,
                              items: without(
                                [...value.blocks_layout?.items],
                                childId,
                              ),
                            },
                          };
                          onChange(id, newFormData);
                        }}
                        title="Delete tab"
                      >
                        <Icon name={trashSVG} size="18px" />
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            );
          }}
        </DragDropList>
        <button
          onClick={() => {
            const [newId, newData] = empty();
            onChange(id, {
              ...value,
              blocks: {
                ...value.blocks,
                [newId]: newData,
              },
              blocks_layout: {
                ...value.blocks_layout,
                items: [...value.blocks_layout?.items, newId],
              },
            });
          }}
          title="Add new tab"
        >
          <Icon name={plusSVG} size="18px" />
        </button>
      </div>
      <StyleWrapperEdit
        {...props}
        selected={activeTabId}
        isVisible={blockStyleVisible}
        setIsVisible={(visibleValue) => {
          setActiveTabId(null);
          setBlockStyleVisible(visibleValue);
        }}
        data={{
          ...activeTabData?.styles,
          ...(activeTabData.align ? { align: activeTabData.align } : {}),
          ...(activeTabData.size ? { size: activeTabData.size } : {}),
        }}
        choices={[]}
        onChangeValue={(styleId, styleValue) =>
          onChange(id, {
            ...value,
            blocks: {
              ...value.blocks,
              [activeTabId]: {
                ...(activeTabData || {}),
                ...(styleId === 'align' ? { align: styleValue } : {}),
                ...(styleId === 'size' ? { size: styleValue } : {}),
                ...(styleId === 'customId' ? { id: styleValue } : {}),
                styles: {
                  ...activeTabData?.styles,
                  [styleId]: styleValue,
                },
              },
            },
          })
        }
      />
    </FormFieldWrapper>
  );
};

export default TabsWidget;
