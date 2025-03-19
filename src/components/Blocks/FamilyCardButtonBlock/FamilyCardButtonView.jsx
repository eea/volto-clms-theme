import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import React from 'react';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';

const FamilyCardButtonView = (props) => {
  const { data } = props;
  const flattern_url = flattenToAppURL(data?.href?.external?.external_link);
  function buttonURL(bData, bFlattern_url) {
    return bData.download && bData?.href?.[0]?.['@type'] === 'File'
      ? bFlattern_url + '/@@download/file'
      : bFlattern_url;
  }
  return {
    ...(data.style === 'left menu' ? (
      <div className="left-menu-detail">
        <CclButton
          url={buttonURL(data, flattern_url)}
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
        url={buttonURL(data, flattern_url)}
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

export default FamilyCardButtonView;
