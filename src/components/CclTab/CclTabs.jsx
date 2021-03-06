import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CclTab from './CclTab';
import './CclTabs.less';

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
  let { children } = props;
  let [activeTab, setActiveTab] = useState(props.children[0].props.tabTitle);

  function onClickTabItem(tab) {
    setActiveTab(tab);
  }

  return (
    <div className="ccl-container-flex">
      <div className="left-content cont-w-25">
        <ul className="left-menu">
          {children
            .filter((item) => !!item.props.tabTitle)
            .map((child) => {
              const { tabTitle } = child.props;
              return (
                <CclTab
                  activeTab={activeTab}
                  key={tabTitle}
                  tabTitle={tabTitle}
                  onClick={onClickTabItem}
                />
              );
            })}
        </ul>

        {/* Check if underPanel element exist and render */}
        {children
          .filter((item) => !!item.props.underPanel)
          .map((child) => {
            const { children } = child.props;
            return children;
          })}
      </div>

      <div className="right-content cont-w-75">
        <div className="tab-content">
          {children
            .filter((item) => !!item.props.tabTitle)
            .map((child, index) => {
              return child.props.tabTitle !== activeTab ? (
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
