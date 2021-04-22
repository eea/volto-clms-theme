import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CclTab from './CclTab';
import './CclTabs.less';

function CclTabs(props) {
  let { children } = props;
  let [activeTab, setActiveTab] = useState(props.children[0].props.label);

  function onClickTabItem(tab) {
    setActiveTab(tab);
  }

  return (
    <div className="ccl-container-flex">
      <div className="left-content cont-w-25">
        <ul className="left-menu">
          {children.filter(item => !!item.props.label).map((child) => {
            const { label } = child.props;

            return (
              <CclTab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </ul>
        
      {/* Check if underPanel element exist and render */}
      {
        children.filter(item => !!item.props.underPanel).map(child => {
          console.log("CHILD: ", child)
          const { children } = child.props;
          return (children);
        })
      }
      </div>

      <div className="right-content cont-w-75">
        <div className="tab-content">
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
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
