import './styles.less';

// import { CardBlockSchema, HomeUsersSchema } from './HomeUsersSchema';
/** upload image */
import { Dimmer, Image, Label, Loader, Message } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';

import { createContent, getContent } from '@plone/volto/actions';
import editingSVG from '@plone/volto/icons/editing.svg';
import navSVG from '@plone/volto/icons/nav.svg';
import { readAsDataURL } from 'promise-file-reader';
import uploadSVG from '@plone/volto/icons/upload.svg';

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

const onChangeCardBlockImage = (
  onChangeBlock,
  block,
  data,
  selectedCardBlock,
  imageValue,
) => {
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
};

const onUploadImage = (pathname, e, setUploading, dispatch) => {
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
    ).then((response) => {
      dispatch(getContent(getBaseUrl(pathname)));
    });
  });
};

const ImageEditor = ({
  editable,
  pathname,
  setUploading,
  uploading,
  dispatch,
  onChangeBlock,
  block,
  data,
  selected,
  selectedCardBlock,
  setSelectedCardBlock,
  openObjectBrowser,
  request,
  content,
}) => {
  React.useEffect(() => {
    if (!__SERVER__) {
      setUploading(false);
    }
    if (!selected) {
      setSelectedCardBlock(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);
  React.useEffect(() => {
    if (request?.loaded && !request?.loading && uploading) {
      setUploading(false);
      onChangeCardBlockImage(onChangeBlock, block, data, selectedCardBlock, {
        url: flattenToAppURL(content['@id']),
        alt: content?.image?.filename,
      });
    }
    /* eslint-disable-next-line */
  }, [request]);
  return (
    editable && (
      <p>
        <label className="file">
          <Icon className="ui button" name={uploadSVG} size={35} />
          <input
            type="file"
            onChange={(e) => onUploadImage(pathname, e, setUploading, dispatch)}
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
    )
  );
};

function isSelected(selected, uid, selectedCardBlock) {
  return selected && uid === selectedCardBlock;
}

const UploadingDimmer = ({ uid, selectedCardBlock, uploading, intl }) => {
  return uid === selectedCardBlock && uploading ? (
    <Dimmer active>
      <Loader indeterminate>
        {intl.formatMessage(messages.uploadingFile)}
      </Loader>
    </Dimmer>
  ) : (
    <></>
  );
};

const handleEdit = (handleEditProps) => {
  const {
    selected,
    uid,
    selectedCardBlock,
    setSelectedCardBlock,
    openObjectBrowser,
    onChangeBlock,
    block,
    data,
  } = handleEditProps;
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
};

const CclImageEditor = ({
  block,
  data,
  editable,
  imageUrl,
  onChangeBlock,
  openObjectBrowser,
  pathname,
  selected,
  selectedCardBlock,
  setSelectedCardBlock,
  uid,
}) => {
  const intl = useIntl();

  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const request = useSelector((state) => state.content.create);
  const content = useSelector((state) => state.content.data);

  return imageUrl ? (
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
          const handleEditPC = {
            selected: selected,
            uid: uid,
            selectedCardBlock: selectedCardBlock,
            setSelectedCardBlock: setSelectedCardBlock,
            openObjectBrowser: openObjectBrowser,
            onChangeBlock: onChangeBlock,
            block: block,
            data: data,
          };
          handleEdit(handleEditPC);
        }}
        onKeyDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          const handleEditPK = {
            selected: selected,
            uid: uid,
            selectedCardBlock: selectedCardBlock,
            setSelectedCardBlock: setSelectedCardBlock,
            openObjectBrowser: openObjectBrowser,
            onChangeBlock: onChangeBlock,
            block: block,
            data: data,
          };
          handleEdit(handleEditPK);
        }}
      >
        <Image size="small" src={`${imageUrl}/@@images/image/preview`} />
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
        <UploadingDimmer
          uid={uid}
          selectedCardBlock={selectedCardBlock}
          uploading={uploading}
          intl={intl}
        />
        <center>
          <h4>{intl.formatMessage(messages.uploadImage)}</h4>
          <ImageEditor
            editable={editable}
            pathname={pathname}
            setUploading={setUploading}
            uploading={uploading}
            dispatch={dispatch}
            onChangeBlock={onChangeBlock}
            block={block}
            data={data}
            selected={selected}
            selectedCardBlock={selectedCardBlock}
            setSelectedCardBlock={setSelectedCardBlock}
            openObjectBrowser={openObjectBrowser}
            request={request}
            content={content}
          />
        </center>
      </Message>
    </div>
  );
};

export default CclImageEditor;
