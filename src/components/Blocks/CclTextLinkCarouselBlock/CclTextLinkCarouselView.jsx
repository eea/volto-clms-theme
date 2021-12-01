import React from 'react';
import loadable from '@loadable/component';
const Slider = loadable(() => import('react-slick'));

const TextLinkCarouselView = (props) => {
  const { data } = props;
  const slider = React.useRef(null);

  const { tabsList = [], setActiveTab = () => {} } = props;
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    fade: false,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 2000,
    beforeChange: (oldIndex, index) => {
      setActiveTab(tabsList[index]);
    },
  };

  return (
    <>
      <Slider {...settings} ref={slider} className="text-carousel">
        {data?.textLink?.items.map((item, index) => (
          <div className="text-link-carousel-block" key={index}>
            <a href={'' + item?.link[0]['@id']}>{item.text}</a>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default TextLinkCarouselView;
