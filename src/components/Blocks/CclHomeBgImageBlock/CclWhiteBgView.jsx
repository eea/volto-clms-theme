import React from 'react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import CclHomeImageEditor from './CclHomeImageEditor';

const CclWhiteBgView = (props) => {
  const { data, isEditMode } = props;

  return (
    <div className="home-map-container">
      <img
        src={
          `${data?.image?.url}/@@images/image/huge` ||
          'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg'
        }
        srcSet={`${data?.image?.url}/@@images/image/huge4000 4000w,
          ${data?.image?.url}/@@images/image/huge3000 3000w,
          ${data?.image?.url}/@@images/image/huge2400 2400w,
          ${data?.image?.url}/@@images/image/huge 1600w,
          ${data?.image?.url}/@@images/image/great 1200w,
          ${data?.image?.url}/@@images/image/larger 1000w,
          ${data?.image?.url}/@@images/image/large 800w,
          ${data?.image?.url}/@@images/image/teaser 600w,
          `}
        alt={data.image.alt}
      />
      {isEditMode && <CclHomeImageEditor {...props} />}
      <div className="ccl-container">
        <div className="home-map-banner">
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

export default CclWhiteBgView;
