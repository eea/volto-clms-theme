import React from 'react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import CclHomeImageEditor from './CclHomeImageEditor';

const CclGreenBgView = (props) => {
  const { data, isEditMode } = props;
  const [showResults, setShowResults] = React.useState(false);
  const onClick = () =>
    setShowResults(showResults === props.id ? false : props.id);
  const onKeyDown = () =>
    setShowResults(showResults === props.id ? false : props.id);

  return (
    <div className="ccl-banner-top-container">
      <div
        className="ccl-banner-top-main"
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
              onClick={onClick}
              onKeyDown={onKeyDown}
            >
              <span className="ccl-icon-map-dot"></span>
              {data?.location}
            </div>
            {showResults === props.id && (
              <div class="ccl-banner-info" style={{ display: 'block' }}>
                <div class="ccl-banner-info-title">
                  {data?.locationInfoTitle}
                </div>
                <div class="ccl-banner-info-content">
                  <p>{data?.locationDescription}</p>
                </div>
                <a
                  class="ccl-banner-info-link"
                  href={'' + data?.locationHref?.[0]?.['@id']}
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
