import React, { useState } from 'react';
import { Dimmer, Loader, Message, Label } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import { readAsDataURL } from 'promise-file-reader';
import { createContent } from '@plone/volto/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';

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
    setUploading(true);
  });
}

const CclHomeImageEditor = (props) => {
  const {
    data,
    openObjectBrowser,
    selected,
    request,
    block,
    content,
    editable,
    pathname,
    onChangeBlock,
  } = props;

  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

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
    }, 1000);
    /* eslint-disable-next-line */
  }, [request.loaded, request.loading]);

  const intl = useIntl();
  return (
    <>
      {!data.image?.url && (
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
      {!!data.image?.url && (
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
)(CclHomeImageEditor);
