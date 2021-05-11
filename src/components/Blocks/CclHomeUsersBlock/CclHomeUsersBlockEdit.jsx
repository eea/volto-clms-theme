import React, { useState } from 'react';
import { HomeUsersSchema, CardBlockSchema } from './HomeUsersSchema';
import { SidebarPortal } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { isEmpty } from 'lodash';
import { emptyCard, getPanels } from './utils';
// import CclCard from '@eeacms/volto-clms-theme/components/CclCard/CclCard';
// import { CardBlockSchema } from '../CclCardBlock/CardBlockSchema';
import './styles.less';

/** upload image */
import { Dimmer, Loader, Message, Image, Label } from 'semantic-ui-react';
import { readAsDataURL } from 'promise-file-reader';
import { getBaseUrl } from '@plone/volto/helpers';
import { createContent } from '@plone/volto/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from '@plone/volto/components';

import uploadSVG from '@plone/volto/icons/upload.svg';
import navSVG from '@plone/volto/icons/nav.svg';

function onUploadImage(pathname, e, setUploading, dispatch) {
  e.stopPropagation();
  const target = e.target;
  const file = target.files[0];
  setUploading(true);
  readAsDataURL(file).then((data) => {
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

const CclHomeUsersBlockEdit = (props) => {
  const {
    block,
    data,
    onChangeBlock,
    selected,
    editable,
    request,
    content,
  } = props;
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
    !request.loading && setUploading(false);
  }, [request]);

  React.useEffect(() => {
    if (request.loaded && !request.loading) {
      onChangeBlock(block, {
        ...data,
        customCards: {
          ...data.customCards,
          blocks: {
            ...data.customCards.blocks,
            [selectedCardBlock]: {
              ...data.customCards.blocks[selectedCardBlock],
              image: {
                url: content.image.download,
                alt: content.image.filename,
              },
            },
          },
        },
      });
    }
    /* eslint-disable-next-line */
  }, [request]);

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
              {/* <CclCard type={'line'} card={panel} /> */}
              <div className="card-line">
                <div className="card-image">
                  {panel.image?.url ? (
                    <>
                      {selected &&
                        uid === selectedCardBlock &&
                        !!panel.image?.url && (
                          <Label
                            as="a"
                            color="red"
                            pointing="below"
                            onClick={() =>
                              onChangeBlock(block, {
                                ...data,
                                customCards: {
                                  ...data.customCards,
                                  blocks: {
                                    ...data.customCards.blocks,
                                    [selectedCardBlock]: {
                                      ...data.customCards.blocks[
                                        selectedCardBlock
                                      ],
                                      image: {},
                                    },
                                  },
                                },
                              })
                            }
                          >
                            Remove image
                          </Label>
                        )}
                      <Image
                        size="small"
                        // src={`${flattenToAppURL(panel.image.url)}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          if (selected && uid === selectedCardBlock) {
                            props.openObjectBrowser({
                              onSelectItem: (url, element) =>
                                onChangeBlock(block, {
                                  ...data,
                                  customCards: {
                                    ...data.customCards,
                                    blocks: {
                                      ...data.customCards.blocks,
                                      [selectedCardBlock]: {
                                        ...data.customCards.blocks[
                                          selectedCardBlock
                                        ],
                                        image: {
                                          url: element.getURL,
                                          alt: element.title,
                                        },
                                      },
                                    },
                                  },
                                }),
                            });
                          } else {
                            setSelectedCardBlock(uid);
                          }
                        }}
                        src={panel.image.url}
                      />
                    </>
                  ) : (
                    <div className="image-add">
                      <Message className="image-message">
                        {uid === selectedCardBlock && uploading && (
                          <Dimmer active>
                            <Loader indeterminate>
                              {/* {this.props.intl.formatMessage("messages.uploading")} */}
                              Uploading file
                            </Loader>
                          </Dimmer>
                        )}
                        <center>
                          <h4>
                            {/* {props.intl.formatMessage('messages.image')} */}
                            Image message
                          </h4>
                          {editable && (
                            <>
                              <p>
                                <label className="file">
                                  {/* {props.intl.formatMessage('messages.browse')} */}
                                  <Icon
                                    className="ui button"
                                    name={uploadSVG}
                                    size={35}
                                  />
                                  <input
                                    type="file"
                                    onChange={(e) =>
                                      onUploadImage(
                                        props.pathname,
                                        e,
                                        setUploading,
                                        dispatch,
                                      )
                                    }
                                    style={{ display: 'none' }}
                                  />
                                </label>
                                <label className="file">
                                  {/* {props.intl.formatMessage('messages.browse')} */}
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
                                      props.openObjectBrowser({
                                        onSelectItem: (url, element) =>
                                          onChangeBlock(block, {
                                            ...data,
                                            customCards: {
                                              ...data.customCards,
                                              blocks: {
                                                ...data.customCards.blocks,
                                                [selectedCardBlock]: {
                                                  ...data.customCards.blocks[
                                                    selectedCardBlock
                                                  ],
                                                  image: {
                                                    url: element.getURL,
                                                    alt: element.title,
                                                  },
                                                },
                                              },
                                            },
                                          }),
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
                  <div className="card-title">
                    <Link to={panel ? panel['@id'] || panel.url || '/' : '/'}>
                      {panel?.title || 'Card default title'}
                    </Link>
                  </div>
                  <div className="card-description">
                    {panel?.description || 'Card default description text'}
                  </div>
                </div>
              </div>
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
          selected && data.customCards?.blocks && selectedCardBlock !== -1
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
export default compose(
  connect(
    (state) => ({
      request: state.content.create,
      content: state.content.data,
    }),
    { createContent },
  ),
)(CclHomeUsersBlockEdit);
