import React, { useState } from 'react';
import { readAsDataURL } from 'promise-file-reader';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import { createContent } from '@plone/volto/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';

import config from '@plone/volto/registry';

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

const CclHomeBgImageBlockEdit = (props) => {
  const { block, data, onChangeBlock, selected, request, content } = props;
  let extras = [];
  extras.push('customButton');

  const [uploading, setUploading] = useState(false);
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

  const variationsConfig = config.blocks.blocksConfig['homeBgImage'].variations;
  let BodyTemplate = '';
  if (!!data?.variation) {
    for (let variation in variationsConfig) {
      if (variationsConfig[variation].id === data.variation) {
        BodyTemplate = variationsConfig[variation].template;
      }
    }
  } else {
    for (let variation in variationsConfig) {
      if (variationsConfig[variation].isDefault === true) {
        BodyTemplate = variationsConfig[variation].template;
      }
    }
  }
  return (
    <BodyTemplate
      onChangeBlock={onChangeBlock}
      isEditMode={true}
      onUploadImage={onUploadImage}
      {...props}
    />
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
)(CclHomeBgImageBlockEdit);
