import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { RenderBlocks } from '@plone/volto/components';
import { withScrollToTarget } from '@eeacms/volto-tabs-block/hocs';
import './fontawesome';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

const CclRouteTabsView = (props) => {
  const {
    metadata = {},
    data = {},
    tabsList = [],
    activeTabIndex = 0,
    hashlink = {},
    setActiveTab = () => {},
  } = props;
  const [hashlinkOnMount, setHashlinkOnMount] = React.useState(false);

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
      const headerWrapper = document.querySelector('.header-wrapper');
      const offsetHeight = headerWrapper?.offsetHeight || 0;
      if (id !== parentId && index > -1 && parent) {
        if (activeTabIndex !== index) {
          setActiveTab(id);
        }
        props.scrollToTarget(parent, offsetHeight);
      } else if (id === parentId && parent) {
        props.scrollToTarget(parent, offsetHeight);
      }
    }
    if (!hashlinkOnMount) {
      setHashlinkOnMount(true);
    }
    /* if (window.performance) {
      if (
        performance.navigation.type === 1 ||
        performance.navigation.type === 0
      ) {
        setActiveTab(tabsList[window.location.hash.substring(4) - 1]);
      }
    } */
    if (
      String(window.performance.getEntriesByType('navigation')[0].type) ===
        'navigate' ||
      String(window.performance.getEntriesByType('navigation')[0].type) ===
        'reload'
    ) {
      setActiveTab(tabsList[window.location.hash.substring(4) - 1]);
    }
    window.onpopstate = () => {
      if (window.location.hash.length > 0) {
        setActiveTab(tabsList[window.location.hash.substring(4) - 1]);
      } else {
        setActiveTab(tabsList[0]);
      }
    };
  }, [
    activeTabIndex,
    data.id,
    hashlink.counter,
    hashlink.hash,
    hashlinkOnMount,
    props,
    setActiveTab,
    tabsList,
  ]);

  const PanelsComponent = () => {
    const { activeTab = null, tabs = {} } = props;
    return (
      <div className="right-content cont-w-75">
        {tabsList.map((tab, index) => {
          return (
            <div
              id={tab}
              key={index}
              className={cx('panel', tab === activeTab && 'panel-selected')}
              role="tabpanel"
              aria-hidden="false"
            >
              <RenderBlocks
                {...props}
                metadata={metadata}
                content={tabs[tab]}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const TabsComponent = () => {
    return (
      <div className="left-content cont-w-25">
        <nav className="left-menu">
          {tabsList.map((tab, index) => {
            const {
              activeTab = null,
              tabs = {},
              setActiveTab = () => {},
            } = props;
            const tabIndex = index + 1;
            const title = tabs[tab].title || `Tab ${tabIndex}`;
            return (
              <div
                key={index}
                id={tabIndex}
                className={cx('card', tab === activeTab && 'active')}
              >
                <NavLink
                  id={'tab' + tabIndex}
                  content={tab}
                  // to={'#' + title.toLowerCase().replace(/\s/g, '-')}
                  to={`#Tab${tabIndex}`}
                  className="collapsed"
                  onClick={() => {
                    if (activeTab !== tab) {
                      setActiveTab(tab);
                    }
                  }}
                  onKeyDown={() => {
                    if (activeTab !== tab) {
                      setActiveTab(tab);
                    }
                  }}
                >
                  {title}
                </NavLink>
              </div>
            );
          })}
        </nav>
      </div>
    );
  };
  // console.log('props', props);

  return (
    <div className="ccl-container ccl-container-flex tab-container" id="froga">
      <TabsComponent />
      <PanelsComponent />
    </div>
  );
};

export default compose(
  connect((state) => {
    return {
      hashlink: state.hashlink,
      location: state.router.location.hash,
    };
  }),
  withScrollToTarget,
)(withRouter(CclRouteTabsView));
