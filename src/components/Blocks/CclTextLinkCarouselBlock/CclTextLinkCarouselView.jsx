import React from 'react';
import loadable from '@loadable/component';
import { UniversalLink } from '@plone/volto/components';
const Slider = loadable(() => import('react-slick'));

const CclTextLinkCarouselView = (props) => {
  const { data } = props;
  const slider = React.useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    fade: false,
    cssEase: 'linear',
    arrows: false,
    autoplay: true,
    autoplaySpeed: parseInt(data?.speed) || 2000,
  };

  return (
    <>
      <div className="ccl-container carousel-text-link-container">
        <Slider {...settings} ref={slider} className="text-carousel">
          {data?.textLink?.items.map((item, index) => (
            <div className="text-link-carousel-block" key={index}>
              <div className="text-link-carousel-block-content">
                <UniversalLink
                  openLinkInNewTab={true}
                  href={'' + item?.link?.[0]?.['@id']}
                >
                  {item?.text}
                </UniversalLink>

                {/* <a href={'' + item?.link?.[0]?.['@id']}>{item?.text}</a> */}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default CclTextLinkCarouselView;
