import './CclTabs.less';

import React, { useState } from 'react';

import CclTab from './CclTab';
import PropTypes from 'prop-types';

/**
 * Tabs component documentation.
 * @function CclTabs
 * @param {Node} children Content object.
 * @example <CclTabs>
        <div tabTitle="Dataset Info">Tab content 1</div>
        <div tabTitle="Metadata">Tab content 2</div>
        <div tabTitle="Download dataset">Tab content 3</div>

        <div underPanel={true}>
          // Any content under tabs
        </div>
      </CclTabs>
 * 
 */
const CclTabs = (props) => {
  let { children, routing = false } = props;
  let [activeTab, setActiveTab] = useState(
    props.children[0].props.tabId ||
      props.children[0].props.tabTitle.replace(' ', ''),
  );

  function onClickTabItem(tab) {
    setActiveTab(tab);
  }
  React.useEffect(() => {
    const hash = window.location.hash.substring(1) || '';
    if (routing) {
      if (hash) {
        setActiveTab(hash);
      } else {
        setActiveTab(
          children
            .filter((item) => !!item.props?.tabTitle)[0]
            .props?.tabTitle?.replace(' ', ''),
        );
      }
    }
  }, [children, routing]);

  return (
    <div className="ccl-container-flex">
      <div className="left-content cont-w-25">
        <nav className="left-menu">
          {children
            .flat()
            .filter((item) => !!item?.props?.tabTitle)
            .map((child, key) => {
              const { tabTitle } = child.props;
              return (
                <CclTab
                  activeTab={activeTab}
                  key={key}
                  routing={routing}
                  tabId={tabTitle?.replace(' ', '')}
                  tabTitle={tabTitle}
                  onClick={onClickTabItem}
                />
              );
            })}
        </nav>

        {/* Check if underPanel element exist and render */}
        {children
          .flat()
          .filter((item) => !!item?.props?.underPanel)
          .map((child) => {
            const { childProps } = child.props;
            return childProps;
          })}
      </div>

      <div className="right-content cont-w-75">
        <div className="tab-content">
          {children
            .flat()
            .filter((item) => !!item?.props?.tabTitle)
            .map((child, index) => {
              return child.props?.tabTitle?.replace(' ', '') !== activeTab ? (
                <div key={index} className="deactivate-content">
                  {child.props.children}
                </div>
              ) : (
                child.props.children
              );
            })}
        </div>
      </div>
    </div>
  );
};

CclTabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
};
export default CclTabs;
