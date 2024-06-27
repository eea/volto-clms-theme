import cx from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { RenderBlocks } from '@plone/volto/components';
import { withScrollToTarget } from '@eeacms/volto-tabs-block/hocs';

import FontAwesomeIcon from '@eeacms/volto-clms-theme/components/FontAwesomeIcon';

const TabsComponent = (props) => {
  const { tabsList = [], setActiveTab } = props;
  function handleAction(activeTab, tab) {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }
  return (
    <div className="tabs" role="tablist">
      {tabsList.map((tab, index) => {
        const { activeTab = null, tabs = {} } = props;
        const title = tabs[tab].title;
        const tabIndex = index + 1;
        const fa_icon = tabs[tab]?.icon?.fontAwesome || null;
        const defaultTitle = `Tab ${tabIndex}`;
        return (
          <span
            key={index}
            id={tabIndex}
            role="tab"
            aria-controls={`tab-${index}`}
            aria-selected={tab === activeTab}
            active={(tab === activeTab).toString()}
            /* classname hontan estiloa aldatu behar bada "===" "!==" gatik aldatuz nahikoa da */
            className={cx('tab', tab === activeTab && 'tab-selected')}
            onClick={() => {
              handleAction(activeTab, tab);
            }}
            onKeyDown={() => {
              handleAction(activeTab, tab);
            }}
            tabIndex="0"
          >
            {fa_icon && (
              <FontAwesomeIcon
                icon={['far', fa_icon]}
                style={{ marginRight: '1rem' }}
              />
            )}
            {title || defaultTitle}
          </span>
        );
      })}
    </div>
  );
};

const PanelsComponent = (props) => {
  const { metadata = {}, tabsList = [], activeTab = null, tabs = {} } = props;
  return (
    <div className="panels">
      {tabsList
        .filter((tab) => tab === activeTab)
        .map((tab, index) => {
          return (
            <div
              key={index}
              className={cx('panel', tab === activeTab && 'panel-selected')}
              id={`tab-${index}`}
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

const CclTabsView = (props) => {
  return (
    <div className="home-news-events-block">
      <div className="ccl-container tab-container">
        <TabsComponent {...props} />
        <PanelsComponent {...props} />
      </div>
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
)(withRouter(CclTabsView));
