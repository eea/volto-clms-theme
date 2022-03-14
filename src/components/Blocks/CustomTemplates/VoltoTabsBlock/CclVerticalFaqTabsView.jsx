import './fontawesome';
import './custom.less';

import { NavLink, Route } from 'react-router-dom';

import React from 'react';
import { RenderBlocks } from '@plone/volto/components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import { withRouter } from 'react-router';
import { withScrollToTarget } from '@eeacms/volto-tabs-block/hocs';

const CclVerticalFaqTabsView = (props) => {
  const { metadata = {}, tabsList = [] } = props;

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

  function handleActive(activeTab, tab, setActiveTab) {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }
  const TabsComponent = () => {
    return (
      <div className="left-content cont-w-25">
        <nav className="left-menu">
          {tabsList.map((tab, index) => {
            const { activeTab = null, tabs = {}, setActiveTab } = props;
            const title = tabs[tab].title;
            const tabIndex = index + 1;
            const defaultTitle = `Tab ${tabIndex}`;
            return (
              <div
                key={index}
                id={tabIndex}
                className={cx('card', tab === activeTab && 'active')}
              >
                <NavLink
                  to={'#tab=' + tabIndex}
                  className="collapsed"
                  onClick={(e) => {
                    handleActive(activeTab, tab, setActiveTab);
                  }}
                  onKeyDown={() => {
                    handleActive(activeTab, tab, setActiveTab);
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
    <div
      id="faq-listing"
      className="ccl-container ccl-container-flex tab-container"
    >
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
)(withRouter(CclVerticalFaqTabsView));
