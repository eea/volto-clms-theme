import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CclTab from './CclTab';
import './CclTabs.less';

function CclTabs(props) {
  let { children } = props;
  let [activeTab, setActiveTab] = useState(props.children[0].props.tabTitle);

  function onClickTabItem(tab) {
    setActiveTab(tab);
  }

  return (
    <div className="ccl-container-flex">
      <div className="left-content cont-w-25">
        <ul className="left-menu">
          {children.filter(item => !!item.props.tabTitle).map((child) => {
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
        {
          children.filter(item => !!item.props.underPanel).map(child => {
            const { children } = child.props;
            return (children);
          })
        }

      </div>

      <div className="right-content cont-w-75">
        <div className="tab-content">
          {children.filter(item => !!item.props.tabTitle).map((child) => {

            return (child.props.tabTitle !== activeTab) ?
              <div className="deactivate-content">{child.props.children}</div> : child.props.children

          })}
        </div>
      </div>
    </div>
  );
}

CclTabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
}
export default CclTabs;
