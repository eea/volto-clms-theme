import React from 'react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';

const CclButtonBlockView = (props) => {
  const { data } = props;
  const flattern_url = flattenToAppURL(data?.href?.[0]?.['@id']);
  return {
    ...(data.style === 'left menu' ? (
      <div className="left-menu-detail">
        <CclButton
          url={
            data.download && data?.href?.[0]?.['@type'] === 'File'
              ? flattern_url + '/@@download/file'
              : flattern_url
          }
          disabled={data?.disabled}
          download={data?.download || data?.href?.[0]?.['@type'] === 'File'}
          target={
            data.target ||
            (data.download && data.href[0]['@type'] === 'File' && '_blank')
          }
          mode={data.style}
        >
          {data.title || 'Text example...'}
        </CclButton>
      </div>
    ) : (
      <CclButton
        url={
          data.download && data?.href?.[0]?.['@type'] === 'File'
            ? flattern_url + '/@@download/file'
            : flattern_url
        }
        disabled={data?.disabled}
        download={data?.download || data?.href?.[0]?.['@type'] === 'File'}
        target={
          data.target ||
          (data.download && data.href[0]['@type'] === 'File' && '_blank')
        }
        mode={data.style}
      >
        {data.title || 'Text example...'}
      </CclButton>
    )),
  };
};

export default CclButtonBlockView;
