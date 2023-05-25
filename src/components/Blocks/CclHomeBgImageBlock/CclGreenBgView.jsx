import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import CclHomeImageEditor from './CclHomeImageEditor';
import React from 'react';

const CclGreenBgView = (props) => {
  const { data, isEditMode } = props;
  const { showInfo, setShowInfo } = props?.content || {};
  return (
    <div className="ccl-banner-top-container">
      <div className="ccl-banner-top-main">
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
                download={
                  data?.download || data?.href?.[0]?.['@type'] === 'File'
                }
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
      {data?.hasLocationInfo && (
        <div className="ccl-banner-top-bar">
          <div className="ccl-container">
            <div className="ccl-banner-top-bar-left"></div>
            <div
              role={'button'}
              tabIndex={0}
              className="ccl-banner-top-bar-right"
              onClick={() => setShowInfo(!showInfo)}
              onKeyDown={() => setShowInfo(!showInfo)}
            >
              <span className="ccl-icon-map-dot"></span>
              {data?.location}
            </div>
            {showInfo && (
              <div className="ccl-banner-info" style={{ display: 'block' }}>
                <div className="ccl-banner-info-title">
                  {data?.locationInfoTitle}
                </div>
                <div className="ccl-banner-info-content">
                  <p>{data?.locationDescription}</p>
                </div>
                <a
                  className="ccl-banner-info-link"
                  href={'' + data?.locationHref?.[0]?.['@id']}
                  target="_blank"
                  rel="noreferrer"
                >
                  More info
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CclGreenBgView;
