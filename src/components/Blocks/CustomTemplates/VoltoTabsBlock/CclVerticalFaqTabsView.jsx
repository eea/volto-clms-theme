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
import { slugify } from '../../utils';

const CclVerticalFaqTabsView = (props) => {
  const { metadata = {}, tabsList = [] } = props;

  function isSpan(subTab, nextSubTab) {
    return subTab === false && nextSubTab !== false;
  }

  const PanelsComponent = () => {
    const { activeTab = null, tabs = {} } = props;
    return (
      <div className="right-content cont-w-75">
        {tabsList.map((tab, index) => {
          const title = tabs[tab].title;
          const tabHash = slugify(title);
          return (
            <Route to={'#' + tabHash}>
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
            const subTab = tabs[tab]?.subTab?.subtab || false;
            const tabIndex = index + 1;
            const nextSubTab =
              tabs[tabsList[tabIndex]]?.subTab?.subtab || false;
            const defaultTitle = `Tab ${tabIndex}`;
            const tabHash = title.split(' ').join('-');
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
                    to={'#' + tabHash}
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
                )}
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
