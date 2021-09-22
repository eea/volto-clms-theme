import React from 'react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import Slider from 'react-slick';
import CclHomeImageEditor from './CclHomeImageEditor';

const CclGreenBgView = (props) => {
  const { data, isEditMode } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider className="home-carousel slick-list" {...settings}>
      {/* <div className="home-carousel"> */}
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
        <div class="ccl-banner-top-bar">
          <div class="ccl-container">
            <div class="ccl-banner-top-bar-left">{data?.greenText}</div>
            <div class="ccl-banner-top-bar-right">
              <span class="ccl-icon-map-dot"></span>
              {data?.location}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </Slider>
  );
};

export default CclGreenBgView;
