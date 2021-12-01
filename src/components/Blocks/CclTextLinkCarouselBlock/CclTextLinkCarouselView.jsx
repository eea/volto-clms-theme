import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@eeacms/volto-tabs-block/less/carousel.less';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import loadable from '@loadable/component';
import { RenderBlocks } from '@plone/volto/components';
import { withScrollToTarget } from '@eeacms/volto-tabs-block/hocs';
const Slider = loadable(() => import('react-slick'));

const TextLinkCarouselView = (props) => {
  const slider = React.useRef(null);
  const [hashlinkOnMount, setHashlinkOnMount] = React.useState(false);
  const {
    activeTab = null,
    data = {},
    hashlink = {},
    metadata = {},
    tabsList = [],
    tabs = {},
    setActiveTab = () => {},
  } = props;
  const activeTabIndex = tabsList.indexOf(activeTab);

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    fade: true,
    cssEase: 'linear',
    autoplay: false,
    autoplaySpeed: 5000,
    beforeChange: (oldIndex, index) => {
      setActiveTab(tabsList[index]);
    },
  };
  React.useEffect(() => {
    const urlHash = props.location.hash.substring(1) || '';
    if (
      hashlink.counter > 0 ||
      (hashlink.counter === 0 && urlHash && !hashlinkOnMount)
    ) {
      const id = hashlink.hash || urlHash || '';
      const index = tabsList.indexOf(id);
      const parentId = data.id || props.id;
      const parent = document.getElementById(parentId);
      // TODO: Find the best way to add offset relative to header
      //       The header can be static on mobile and relative on > mobile
      // const headerWrapper = document.querySelector('.header-wrapper');
      // const offsetHeight = headerWrapper?.offsetHeight || 0;
      const offsetHeight = 0;
      if (id !== parentId && index > -1 && parent) {
        if (activeTabIndex !== index) {
          slider.current.slickGoTo(index);
        }
        props.scrollToTarget(parent, offsetHeight);
      } else if (id === parentId && parent) {
        props.scrollToTarget(parent, offsetHeight);
      }
    }
    if (!hashlinkOnMount) {
      setHashlinkOnMount(true);
    }
    /* eslint-disable-next-line */
  }, [hashlink.counter]);

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
)(withRouter(TextLinkCarouselView));
