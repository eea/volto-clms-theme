import './fontawesome';

import { NavLink, Route } from 'react-router-dom';

import React from 'react';
import { RenderBlocks } from '@plone/volto/components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import { withRouter } from 'react-router';
import { withScrollToTarget } from '@eeacms/volto-tabs-block/hocs';

const CclVerticalTabsView = (props) => {
  const { metadata = {}, tabsList = [], ExtraComponent = null } = props;
  const PanelsComponent = () => {
    const { activeTab = null, tabs = {} } = props;
    return (
      <div className="right-content cont-w-75">
        {tabsList.map((tab, index) => {
          return (
            <Route to={'#' + activeTab}>
              <div
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
            </Route>
          );
        })}
      </div>
    );
  };
  const TabsComponent = () => {
    return (
      <div className="left-content cont-w-25">
        {ExtraComponent ? <ExtraComponent /> : ''}
        <nav className="left-menu">
          {tabsList.map((tab, index) => {
            const {
              activeTab = null,
              tabs = {},
              setActiveTab = () => {},
            } = props;
            const title = tabs[tab].title;
            const subTab = tabs[tab]?.subTab?.subtab || false;
            const tabIndex = index + 1;
            const nextTabIndex = index + 2;
            const nextSubTab =
              tabs[tabsList[tabIndex]]?.subTab?.subtab || false;
            const defaultTitle = `Tab ${tabIndex}`;
            return (
              <div
                key={index}
                id={tabIndex}
                className={cx(
                  'card',
                  tab === activeTab && 'active',
                  subTab && 'subcard',
                )}
              >
                <NavLink
                  to={
                    subTab === false && nextSubTab !== false
                      ? '#tab' + nextTabIndex
                      : '#tab' + tabIndex
                  }
                  className="collapsed"
                  onClick={(e) => {
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
                  {title || defaultTitle}
                </NavLink>
              </div>
            );
          })}
        </nav>
      </div>
    );
  };

  return (
    <div className="ccl-container ccl-container-flex tab-container">
      <TabsComponent />
      <PanelsComponent />
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
