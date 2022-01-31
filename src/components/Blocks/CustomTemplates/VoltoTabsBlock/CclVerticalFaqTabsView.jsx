import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { RenderBlocks } from '@plone/volto/components';
import { withScrollToTarget } from '@eeacms/volto-tabs-block/hocs';
import './fontawesome';
import cx from 'classnames';
import './custom.less';
import { Route, NavLink } from 'react-router-dom';

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
                  to={'#tab' + tabIndex}
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
