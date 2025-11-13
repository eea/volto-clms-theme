import React, { useState, useEffect, useMemo } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import cx from 'classnames';
import { RenderBlocks } from '@plone/volto/components';
import { slugify } from '../../utils';
import './fontawesome';
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import { withScrollToTarget } from '@eeacms/volto-tabs-block/hocs';

const scrollToContentSection = () => {
  const contentSection = document.querySelector('.right-content');
  if (contentSection) {
    contentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const TabsComponent = ({
  tabsList = [],
  tabs = {},
  ExtraComponent = () => null,
  metadata = {},
}) => {
  const location = useLocation();
  const history = useHistory();
  // Local state for the active tab and which main tab (if any) is expanded.
  const [activeTab, setActiveTab] = useState(null);
  const [expandedTab, setExpandedTab] = useState(null);

  const groupedTabs = useMemo(() => {
    const groups = [];
    let currentGroup = null;
    tabsList.forEach((tabId) => {
      const isSubTab = Boolean(tabs[tabId]?.subTab?.subtab);
      if (!isSubTab) {
        currentGroup = { main: tabId, subs: [] };
        groups.push(currentGroup);
      } else if (currentGroup) {
        currentGroup.subs.push(tabId);
      } else {
        currentGroup = { main: tabId, subs: [] };
        groups.push(currentGroup);
      }
    });
    return groups;
  }, [tabsList, tabs]);

  // Helper: update URL and activeTab.
  const updateTab = (tabId, tabQuery) => {
    setActiveTab(tabId);
    history.push({ search: tabQuery });
  };

  // When clicking a main tab:
  const handleMainTabClick = (e, tabId, tabHash, subs) => {
    e.preventDefault();
    // If there are subtabs for this main tab:
    if (subs && subs.length > 0) {
      if (expandedTab !== tabId) {
        setExpandedTab(tabId);
        // If the current active tab is not one of the subtabs, switch to the first subtab.
        if (!subs.includes(activeTab)) {
          const firstSub = subs[0];
          const subTitle = tabs[firstSub]?.title || 'Subtab';
          updateTab(firstSub, getTabHash(subTitle));
        } else {
          // Otherwise, update the URL hash.
          updateTab(tabId, tabHash);
        }
      } else {
        // Collapse the subtabs and select the first main tab.
        setExpandedTab(null);
        updateTab(
          tabsList[0] || tabId,
          tabs[tabsList[0]]?.title
            ? getTabHash(tabs[tabsList[0]]?.title || '')
            : tabId,
        );
      }
    } else {
      // No subtabs—simply update the active tab.
      updateTab(tabId, tabHash);
    }
  };

  // When clicking a subtab.
  const handleSubTabClick = (e, tabId, tabHash) => {
    e.preventDefault();
    updateTab(tabId, tabHash);
  };

  const getTabHash = (title) => `?tab=${slugify(title)}`;

  // On mount or when location.hash changes, update activeTab.
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabQuery = urlParams.get('tab');

    if (tabQuery) {
      const foundTab = tabsList.find((tabId) => {
        const title = tabs[tabId]?.title || '';
        return slugify(title) === tabQuery;
      });
      if (foundTab) {
        setActiveTab(foundTab);
        return;
      }
    }
    // Fallback: if no hash is present or no match was found, select the first tab.
    if (tabsList.length > 0) {
      setActiveTab(tabsList[0]);
    }
  }, [location.search, tabsList, tabs]);

  useEffect(() => {
    if (activeTab) {
      const group = groupedTabs.find((group) => group.subs.includes(activeTab));
      if (group && expandedTab !== group.main) {
        setExpandedTab(group.main);
      }
    }
  }, [activeTab, expandedTab, groupedTabs]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const hasHash = location.hash.length > 1;
    const hasQueryTab = urlParams.has('tab');

    if (hasHash || hasQueryTab) {
      scrollToContentSection();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab, location.hash.length, location.search]);

  return (
    <>
      <div className="left-content cont-w-25">
        <ExtraComponent />
        <nav className="left-menu">
          {groupedTabs.map((group, idx) => {
            const mainTab = group.main;
            const mainTitle = tabs[mainTab]?.title || `Tab ${idx + 1}`;
            const mainTabHash = getTabHash(mainTitle);
            return (
              <React.Fragment key={mainTab}>
                <div
                  id={mainTabHash}
                  className={cx(
                    'card',
                    activeTab === mainTab && 'active',
                    group.subs && group.subs.length > 0 && 'has-subtabs',
                  )}
                >
                  <NavLink
                    to={mainTabHash}
                    onClick={(e) =>
                      handleMainTabClick(e, mainTab, mainTabHash, group.subs)
                    }
                  >
                    {mainTitle}
                  </NavLink>
                </div>
                {/* Render subtabs only if the main tab is expanded */}
                {group.subs.length > 0 && expandedTab === mainTab && (
                  <div className="subtabs">
                    {group.subs.map((subTabId) => {
                      const subTitle = tabs[subTabId]?.title || 'Subtab';
                      const subTabHash = getTabHash(subTitle);
                      return (
                        <div
                          key={subTabId}
                          id={subTabHash}
                          className={cx(
                            'card',
                            activeTab === subTabId && 'active',
                            'subcard',
                          )}
                        >
                          <NavLink
                            to={subTabHash}
                            onClick={(e) =>
                              handleSubTabClick(e, subTabId, subTabHash)
                            }
                          >
                            {subTitle}
                          </NavLink>
                        </div>
                      );
                    })}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
      <div className="right-content cont-w-75">
        {activeTab && tabs[activeTab] ? (
          <div
            key={activeTab} // Using activeTab as a key forces a re‑mount on change.
            className={cx('panel', 'panel-selected')}
            role="button"
            aria-hidden="false"
          >
            <RenderBlocks metadata={metadata} content={tabs[activeTab]} />
          </div>
        ) : (
          <div>No content available.</div>
        )}
      </div>
    </>
  );
};

const CclProductTabsWithSubtabsView = (props) => {
  const locale = useSelector((state) => state.intl.locale);
  const ExtraComponent = () => (
    <div className="left-menu-detail">
      <div className="menu-detail-image">
        {props.metadata?.image ? (
          <img
            src={props.metadata?.image?.scales?.preview?.download}
            alt={props.metadata?.title || 'Product map preview'}
          />
        ) : (
          <img
            src="https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg"
            alt="Product map preview"
            style={{ opacity: 0.5 }}
          />
        )}
      </div>
      {props.metadata?.show_in_mapviewer_link && (
        <>
          <div className="menu-detail-button">
            <a
              href={
                '/' + locale + '/map-viewer?product=' + props.metadata['UID']
              }
              className="ccl-button ccl-button--default"
            >
              <FormattedMessage
                id="View in the data viewer"
                defaultMessage="View in the data viewer"
              />
            </a>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="ccl-container ccl-container-flex tab-container">
      <TabsComponent {...props} ExtraComponent={ExtraComponent} />
    </div>
  );
};

export default compose(
  connect((state) => ({
    hashlink: state.hashlink,
  })),
  withScrollToTarget,
)(CclProductTabsWithSubtabsView);
