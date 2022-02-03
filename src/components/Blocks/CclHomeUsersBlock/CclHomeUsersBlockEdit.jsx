import React, { useState } from 'react';
import { HomeUsersSchema, CardBlockSchema } from './HomeUsersSchema';
import { SidebarPortal, Icon, InlineForm } from '@plone/volto/components';
import { isEmpty } from 'lodash';
import { emptyCard, getPanels } from './utils';
import { defineMessages, useIntl } from 'react-intl';
import './styles.less';

/** upload image */
import { Dimmer, Loader, Message, Image, Label } from 'semantic-ui-react';
import { readAsDataURL } from 'promise-file-reader';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import { createContent } from '@plone/volto/actions';
import { compose } from 'redux';
import { connect, useDispatch } from 'react-redux';

import uploadSVG from '@plone/volto/icons/upload.svg';
import navSVG from '@plone/volto/icons/nav.svg';
import editingSVG from '@plone/volto/icons/editing.svg';

const messages = defineMessages({
  uploadImage: {
    id: 'Upload image',
    defaultMessage: 'Upload or select an image',
  },
  uploadingFile: {
    id: 'Uploading file',
    defaultMessage: 'Uploading file',
  },
  removeImage: {
    id: 'Remove image',
    defaultMessage: 'Remove image',
  },
  editImage: {
    id: 'Edit image',
    defaultMessage: 'Edit',
  },
});

function onUploadImage(pathname, e, setUploading, dispatch) {
  e.stopPropagation();
  e.preventDefault();
  const target = e.target;
  const file = target.files[0];
  readAsDataURL(file).then((data) => {
    setUploading(true);
    const fields = data.match(/^data:(.*);(.*),(.*)$/);
    dispatch(
      createContent(getBaseUrl(pathname), {
        '@type': 'Image',
        image: {
          data: fields[3],
          encoding: fields[2],
          'content-type': fields[1],
          filename: file.name,
        },
      }),
    );
  });
}

function onChangeCardBlockImage(
  onChangeBlock,
  block,
  data,
  selectedCardBlock,
  imageValue,
) {
  onChangeBlock(block, {
    ...data,
    customCards: {
      ...data.customCards,
      blocks: {
        ...data.customCards.blocks,
        [selectedCardBlock]: {
          ...data.customCards.blocks[selectedCardBlock],
          image: imageValue,
        },
      },
    },
  });
}

function isSelected(selected, uid, selectedCardBlock) {
  return selected && uid === selectedCardBlock;
}

function isBlockEdit(selected, selectedCardBlock) {
  return selected && selectedCardBlock === -1;
}

function isCardEdit(selected, blocks, selectedCardBlock) {
  return selected && blocks && selectedCardBlock !== -1;
}

function handleEdit(
  selected,
  uid,
  selectedCardBlock,
  setSelectedCardBlock,
  openObjectBrowser,
  onChangeBlock,
  block,
  data,
) {
  if (isSelected(selected, uid, selectedCardBlock)) {
    openObjectBrowser({
      onSelectItem: (url, element) =>
        onChangeCardBlockImage(onChangeBlock, block, data, selectedCardBlock, {
          url: element['@id'],
          alt: element.title,
        }),
    });
  } else {
    setSelectedCardBlock(uid);
  }
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
  const intl = useIntl();

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
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!__SERVER__) {
      setUploading(false);
    }
    if (!selected) {
      setSelectedCardBlock(-1);
    }
  }, [selected]);

  React.useEffect(() => {
    if (request.loaded && !request.loading) {
      setUploading(false);
      onChangeCardBlockImage(onChangeBlock, block, data, selectedCardBlock, {
        url: flattenToAppURL(content['@id']),
        alt: content?.image?.filename,
      });
    } else if (!request.loading) {
      setUploading(false);
    }
    /* eslint-disable-next-line */
  }, [request]);

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
                  {panel.image?.url ? (
                    <>
                      {isSelected(selected, uid, selectedCardBlock) && (
                        <Label
                          as="a"
                          color="red"
                          pointing="below"
                          onClick={() =>
                            onChangeCardBlockImage(
                              onChangeBlock,
                              block,
                              data,
                              selectedCardBlock,
                              {},
                            )
                          }
                        >
                          {intl.formatMessage(messages.removeImage)}
                        </Label>
                      )}

                      <div
                        role="button"
                        tabindex="0"
                        className="ui image edit-image-container"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleEdit(
                            selected,
                            uid,
                            selectedCardBlock,
                            setSelectedCardBlock,
                            openObjectBrowser,
                            onChangeBlock,
                            block,
                            data,
                          );
                        }}
                        onKeyDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleEdit(
                            selected,
                            uid,
                            selectedCardBlock,
                            setSelectedCardBlock,
                            openObjectBrowser,
                            onChangeBlock,
                            block,
                            data,
                          );
                        }}
                      >
                        <Image
                          size="small"
                          src={`${panel.image.url}/@@images/image`}
                        />
                        {isSelected(selected, uid, selectedCardBlock) && (
                          <div className="edit-image">
                            <Icon className="ui" name={editingSVG} size={35} />
                            {intl.formatMessage(messages.editImage)}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="image-add">
                      <Message className="image-message">
                        {uid === selectedCardBlock && uploading && (
                          <Dimmer active>
                            <Loader indeterminate>
                              {intl.formatMessage(messages.uploadingFile)}
                            </Loader>
                          </Dimmer>
                        )}
                        <center>
                          <h4>{intl.formatMessage(messages.uploadImage)}</h4>
                          {editable && (
                            <>
                              <p>
                                <label className="file">
                                  <Icon
                                    className="ui button"
                                    name={uploadSVG}
                                    size={35}
                                  />
                                  <input
                                    type="file"
                                    onChange={(e) =>
                                      onUploadImage(
                                        pathname,
                                        e,
                                        setUploading,
                                        dispatch,
                                      )
                                    }
                                    style={{ display: 'none' }}
                                  />
                                </label>
                                <label className="file">
                                  <Icon
                                    className="ui button"
                                    name={navSVG}
                                    size={35}
                                  />
                                  <input
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      openObjectBrowser({
                                        onSelectItem: (url, element) =>
                                          onChangeCardBlockImage(
                                            onChangeBlock,
                                            block,
                                            data,
                                            selectedCardBlock,
                                            {
                                              url: element['@id'],
                                              alt: element.title,
                                            },
                                          ),
                                      });
                                    }}
                                    style={{ display: 'none' }}
                                  />
                                </label>
                              </p>
                            </>
                          )}
                        </center>
                      </Message>
                    </div>
                  )}
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
