import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

function CclTab(props) {
  let { activeTab, tabTitle, onClick, tabId, routing } = props;

  function onTabClick() {
    onClick(tabId);
  }
  return (
    <div
      className={cx('card', activeTab === tabId && 'active')}
      onClick={onTabClick}
      onKeyDown={onTabClick}
      tabIndex="0"
      role="button"
      id={tabId}
    >
      {routing ? (
        <NavLink to={'#' + tabId}>{tabTitle}</NavLink>
      ) : (
        <NavLink to={'#'}>{tabTitle}</NavLink>
      )}
    </div>
  );
}

CclTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  tabTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CclTab;
