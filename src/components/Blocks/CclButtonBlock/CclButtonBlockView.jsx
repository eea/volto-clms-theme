import React from 'react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';

const CclButtonBlockView = (props) => {
  const { data } = props;

  return (
    <CclButton
      url={
        data?.download && data?.href?.[0]?.['@type'] === 'File'
          ? data?.href?.[0]?.['@id'] + '/@@download/file'
          : data?.href?.[0]?.['@id']
      }
      disabled={data?.disabled}
      download={data?.download || data?.href?.[0]?.['@type'] === 'File'}
      target={
        data.target ||
        (data?.download && data.href[0]['@type'] === 'File' && '_blank')
      }
      mode={data.style}
    >
      {data.title || 'Text example...'}
    </CclButton>
  );
};

export default CclButtonBlockView;
