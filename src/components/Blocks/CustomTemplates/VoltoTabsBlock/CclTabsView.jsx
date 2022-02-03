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
  const { metadata = {}, tabsList = [], setActiveTab = () => {} } = props;

  const PanelsComponent = () => {
    return (
      <div className="panels">
        {tabsList.map((tab, index) => {
          const { activeTab = null, tabs = {} } = props;
          return (
            <div
              key={index}
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
    );
  };

  function handleAction(activeTab, tab) {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }

  const TabsComponent = () => {
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
              aria-controls={title || defaultTitle}
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

  return (
    <div className="home-news-events-block">
      <div className="ccl-container tab-container">
        <TabsComponent />
        <PanelsComponent />
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
