import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { RenderBlocks } from '@plone/volto/components';
import { withScrollToTarget } from '@eeacms/volto-tabs-block/hocs';
import './fontawesome';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CclTabsView = (props) => {
  const [hashlinkOnMount, setHashlinkOnMount] = React.useState(false);
  const {
    metadata = {},
    data = {},
    tabsList = [],
    activeTabIndex = 0,
    hashlink = {},
    setActiveTab = () => {},
  } = props;

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
    return (
      <>
        <div class="panels">
          {tabsList.map((tab, index) => {
            const { activeTab = null, tabs = {} } = props;
            return (
              <div
                className={cx('panel', tab === activeTab && 'panel-selected')}
                id="news_panel"
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
      </>
    );
  };
  const TabsComponent = () => {
    return (
      <>
        <div class="tabs" role="tablist">
          {tabsList.map((tab, index) => {
            const {
              activeTab = null,
              tabs = {},
              setActiveTab = () => {},
            } = props;
            const title = tabs[tab].title;
            const tabIndex = index + 1;

            const defaultTitle = `Tab ${tabIndex}`;
            return (
              <>
                <span
                  class=" "
                  id={tabIndex}
                  role="tab"
                  aria-controls={title || defaultTitle}
                  aria-selected={tab === activeTab}
                  active={tab === activeTab}
                  className={cx('tab', tab === activeTab && 'tab-selected')}
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
                  tabIndex="0"
                >
                  <FontAwesomeIcon
                    icon={['far', 'newspaper']}
                    style={{ marginRight: '1rem' }}
                  />
                  {title || defaultTitle}
                </span>{' '}
              </>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <>
      <div class="ccl-container tab-container">
        <TabsComponent />
        <PanelsComponent />
      </div>
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
)(withRouter(CclTabsView));
