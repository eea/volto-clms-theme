/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { HomeBgImageSchema } from './CclHomeBgImageSchema';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { defineMessages, useIntl } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers';
import { useDispatch } from 'react-redux';
import { Dimmer, Loader, Message, Label } from 'semantic-ui-react';
import { SidebarPortal, Icon, BlockDataForm } from '@plone/volto/components';

import uploadSVG from '@plone/volto/icons/upload.svg';
import navSVG from '@plone/volto/icons/nav.svg';
import editingSVG from '@plone/volto/icons/editing.svg';
import config from '@plone/volto/registry';

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

const CclGreenBgView = (props) => {
  const {
    data,
    isEditMode,
    onUploadImage,
    openObjectBrowser,
    selected,
    request,
    block,
    content,
    editable,
    pathname,
    onChangeBlock,
  } = props;

  let extras = [];
  extras.push('customButton');
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  if (isEditMode) {
    React.useEffect(() => {
      if (!__SERVER__) {
        setUploading(false);
      }
    }, [selected]);

    React.useEffect(() => {
      setTimeout(() => {
        if (request.loaded && !request.loading && uploading) {
          onChangeBlock(block, {
            ...data,
            image: {
              url: flattenToAppURL(content['@id']),
              alt: content?.image?.filename,
            },
          });
          setUploading(false);
        }
      }, 2000);
      /* eslint-disable-next-line */
    }, [request.loaded, request.loading]);
  }

  const intl = useIntl();
  return (
    <>
      <div
        className="ccl-banner-top-container"
        style={{
          backgroundImage:
            `url(${data?.image?.url}/@@images/image)` ||
            'url(https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg)',
        }}
      >
        {isEditMode && !data.image?.url && (
          <Message className="image-message">
            {selected && uploading && (
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
                      <Icon className="ui button" name={uploadSVG} size={35} />
                      <input
                        type="file"
                        onChange={(e) =>
                          onUploadImage(pathname, e, setUploading, dispatch)
                        }
                        style={{ display: 'none' }}
                      />
                    </label>
                    <label className="file">
                      <Icon className="ui button" name={navSVG} size={35} />
                      <input
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          openObjectBrowser({
                            onSelectItem: (_url, element) =>
                              onChangeBlock(block, {
                                ...data,
                                image: {
                                  url: element['@id'],
                                  alt: element.title,
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
        )}
        {isEditMode && !!data.image?.url && (
          <>
            <Label
              as="a"
              color="red"
              pointing="below"
              onClick={() =>
                onChangeBlock(block, {
                  ...data,
                  image: {},
                })
              }
            >
              {intl.formatMessage(messages.removeImage)}
            </Label>
            <div
              role="button"
              tabindex="0"
              className="ui image edit-image-container"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                openObjectBrowser({
                  onSelectItem: (url, element) =>
                    onChangeBlock(block, {
                      ...data,
                      image: {
                        url: element['@id'],
                        alt: element.title,
                      },
                    }),
                });
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
                openObjectBrowser({
                  onSelectItem: (url, element) =>
                    onChangeBlock(block, {
                      ...data,
                      image: {
                        url: element['@id'],
                        alt: element.title,
                      },
                    }),
                });
              }}
            >
              <Icon className="ui" name={editingSVG} size={35} />
              {intl.formatMessage(messages.editImage)}
            </div>
          </>
        )}
        <div className="ccl-container">
          <div className="ccl-banner-top-main-block-title">
            <h1>{data?.title || 'Default title'}</h1>
            <h2>{data?.subtitle || 'Default subtitle'}</h2>
            <h3>{data?.description || 'Default description'} </h3>
            {data.hasButton === true && (
              <CclButton
                url={
                  data.download && data?.href?.[0]?.['@type'] === 'File'
                    ? data?.href?.[0]?.['@id'] + '/@@download/file'
                    : data?.href?.[0]?.['@id']
                }
                disabled={data?.disabled}
                download={
                  data?.download || data?.href?.[0]?.['@type'] === 'File'
                }
                target={
                  data.target ||
                  (data.download &&
                    data.href[0]['@type'] === 'File' &&
                    '_blank')
                }
                mode={data.style}
              >
                {data.buttonTitle || 'Text example...'}
              </CclButton>
            )}
          </div>
        </div>
      </div>
      <SidebarPortal selected={selected}>
        <BlockDataForm
          schema={HomeBgImageSchema(config)}
          title="Carousel Div block"
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
          block={block}
        />
      </SidebarPortal>
    </>
  );
};

export default CclGreenBgView;
