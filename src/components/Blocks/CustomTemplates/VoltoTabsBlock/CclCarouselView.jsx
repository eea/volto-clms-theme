import './custom.less';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@eeacms/volto-tabs-block/less/carousel.less';

import React from 'react';
import { RenderBlocks } from '@plone/volto/components';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import cx from 'classnames';
import loadable from '@loadable/component';
import { withRouter } from 'react-router';
import { withScrollToTarget } from '@eeacms/volto-tabs-block/hocs';

const Slider = loadable(() => import('react-slick'));

const View = (props) => {
  const slider = React.useRef(null);
  const {
    // activeTab = null,
    metadata = {},
    tabsList = [],
    tabs = {},
    setActiveTab,
  } = props;

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    beforeChange: (oldIndex, index) => {
      setActiveTab(tabsList[index]);
    },
  };

  /* const Dots = (dotProps) => {
    const { dotActiveTab = null, dotTabsList = [], dotSlider = {} } = dotProps;
    return dotTabsList.length > 1 ? (
      <ul className={cx('slick-dots', dotProps.uiContainer)} role={'tablist'}>
        {dotTabsList.map((tab, index) => (
          <li
            key={`dot-${tab}`}
            className={cx({ 'slick-active': dotActiveTab === tab })}
            role={'presentation'}
          >
            <button
              onClick={() => {
                if (dotSlider.current) {
                  dotSlider.current.slickGoTo(index);
                }
              }}
            />
          </li>
        ))}
      </ul>
    ) : (
      ''
    );
  };
 */
  /*   const ArrowsGroup = (arrowProps) => {
    return (
      <div className={'slick-arrows'}>
        <button
          aria-label="Previous slide"
          className="slick-prev slick-arrow"
          onClick={() => {
            if (slider.current) {
              slider.current.slickPrev();
            }
          }}
        ></button>

        <button
          aria-label="Next slide"
          className="slick-next slick-arrow"
          onClick={() => {
            if (slider.current) {
              slider.current.slickNext();
            }
          }}
        ></button>
      </div>
    );
  }; */

  const [showInfo, setShowInfo] = React.useState(false);
  const panes = tabsList.map((tab, index) => {
    return {
      id: tab,
      renderItem: (
        <RenderBlocks
          key={`slide-${tab}`}
          {...props}
          metadata={metadata}
          content={{
            ...tabs[tab],
            setShowInfo: setShowInfo,
            showInfo: showInfo,
          }}
        />
      ),
    };
  });

  return (
    <>
      <Slider {...settings} ref={slider} className="home-carousel">
        {panes.length ? panes.map((pane) => pane.renderItem) : ''}
      </Slider>
      {/* <ArrowsGroup activeTab={activeTab} tabsList={tabsList} slider={slider} /> */}
      {/* <Dots
        dotActiveTab={activeTab}
        dotTabsList={tabsList}
        dotSlider={slider}
      /> */}
    </>
  );
};

export default compose(
  connect((state) => {
    return {
      hashlink: state.hashlink,
    };
  }),
  withScrollToTarget,
)(withRouter(View));
