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
  if (tab === 'd7706c16-7c4a-4c0e-9471-90765a302c1c') {
    document.querySelector('#loader').style.display = 'block';
  } else {
    closeSpinner();
  }
};
const closeSpinner = () => {
  document.querySelector('#loader').style.display = 'none';
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
  if (activeTab === 'd7706c16-7c4a-4c0e-9471-90765a302c1c') {
    document.querySelector('#loader').style.display = 'block';
  }
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
                id="loader"
                className="loading"
                role="alert"
                aria-busy="true"
                aria-live="polite"
              >
                <div>
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <style>
                      {`.spinner_ajPY {
              transform-origin: center;
              animation: spinner_AtaB .75s infinite linear;
              fill: #a0b128; stroke-width: 3px; filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.1));
            }
            @keyframes spinner_AtaB {
              100% {
                transform: rotate(360deg);
              }
            }`}
                    </style>
                    <path
                      d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                      opacity=".25"
                    />
                    <path
                      d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
                      className="spinner_ajPY"
                    />
                  </svg>
                </div>
              </div>
              <div
                className={cx('panel', tab === activeTab && 'panel-selected')}
                role="button"
                aria-hidden="false"
                onLoad={() => {
                  closeSpinner();
                }}
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
