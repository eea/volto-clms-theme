import React from 'react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import CclHomeImageEditor from './CclHomeImageEditor';

const CclGreenBgView = (props) => {
  const { data, isEditMode } = props;

  return (
    <div
      className="ccl-banner-top-container"
      style={{
        backgroundImage: `url(${data?.image?.url}/@@images/image)`,
      }}
    >
      {isEditMode && <CclHomeImageEditor {...props} />}
      <div className="ccl-container">
        <div className="ccl-banner-top-main-block-title">
          {data.title && <h1>{data?.title}</h1>}
          {data.subtitle && <h2>{data?.subtitle}</h2>}
          {data.description && <h3>{data?.description} </h3>}
          {data?.hasButton === true && (
            <CclButton
              url={
                data?.download && data?.href?.[0]?.['@type'] === 'File'
                  ? data?.href?.[0]?.['@id'] + '/@@download/file'
                  : data?.href?.[0]?.['@id']
              }
              disabled={data?.disabled}
              download={data?.download || data?.href?.[0]?.['@type'] === 'File'}
              target={
                data?.target ||
                (data?.download &&
                  data?.href[0]['@type'] === 'File' &&
                  '_blank')
              }
              mode={data?.style}
            >
              {data?.buttonTitle}
            </CclButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default CclGreenBgView;
