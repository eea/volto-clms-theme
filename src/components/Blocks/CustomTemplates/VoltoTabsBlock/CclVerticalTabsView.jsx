import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink, Route } from 'react-router-dom';
import { compose } from 'redux';

import { RenderBlocks } from '@plone/volto/components';
import { withScrollToTarget } from '@eeacms/volto-tabs-block/hocs';
import { useLocation } from 'react-router-dom';

import { slugify } from '../../utils';
import './fontawesome';

import cx from 'classnames';

const handleClick = (e, tab, activeTab, setActiveTab, location, tabHash) => {
  if (activeTab !== tab) {
    location.hash = `#${tabHash}`;
    setActiveTab(tab);
  }
};

function isSpan(subTab, nextSubTab) {
  return subTab === false && nextSubTab !== false;
}

const TabsComponent = (props) => {
  const {
    tabsList = [],
    ExtraComponent = () => {
      return '';
    },
    activeTab = null,
    tabs = {},
    setActiveTab,
  } = props;
  const location = useLocation();
  return (
    <div className="left-content cont-w-25">
      {<ExtraComponent />}
      <nav className="left-menu">
        {tabsList.map((tab, index) => {
          const title = tabs[tab].title;
          const subTab = tabs[tab]?.subTab?.subtab || false;
          const tabIndex = index + 1;
          const nextSubTab = tabs[tabsList[tabIndex]]?.subTab?.subtab || false;
          const defaultTitle = `Tab ${tabIndex}`;
          const tabHash = `tab=${slugify(title)}`;
          return (
            <div
              key={index}
              id={tabHash}
              className={cx(
                'card',
                tab === activeTab && 'active',
                subTab && 'subcard',
              )}
            >
              {isSpan(subTab, nextSubTab) ? (
                <span>{title || defaultTitle}</span>
              ) : (
                <NavLink
                  to={'?' + tabHash}
                  className="collapsed"
                  onClick={(e) => {
                    handleClick(
                      e,
                      tab,
                      activeTab,
                      setActiveTab,
                      location,
                      tabHash,
                    );
                  }}
                  onKeyDown={(e) => {
                    handleClick(
                      e,
                      tab,
                      activeTab,
                      setActiveTab,
                      location,
                      tabHash,
                    );
                  }}
                >
                  {title || defaultTitle}
                </NavLink>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

const PanelsComponent = (props) => {
  const { metadata = {}, tabsList = [], activeTab = null, tabs = {} } = props;
  return (
    <div className="right-content cont-w-75">
      {tabsList
        .filter((tab) => tab === activeTab)
        .map((tab, index) => {
          const title = tabs[tab].title;
          const tabHash = `tab=${slugify(title)}`;
          return (
            <Route key={index} to={'#' + tabHash}>
              <div
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
            </Route>
          );
        })}
    </div>
  );
};

const CclVerticalTabsView = (props) => {
  return (
    <div className="ccl-container ccl-container-flex tab-container">
      <TabsComponent {...props} />
      <PanelsComponent {...props} />
    </div>
  );
};

export default compose(
  connect((state) => {
    return {
      hashlink: state.hashlink,
    };
  }),
  withScrollToTarget,
)(withRouter(CclVerticalTabsView));
