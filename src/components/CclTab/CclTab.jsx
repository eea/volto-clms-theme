import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Redirect, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import CclLoginModal from '@eeacms/volto-clms-theme/components/CclLoginModal/CclLoginModal';

import cx from 'classnames';
import PropTypes from 'prop-types';

const scrollToFirstTabContent = () => {
  const firstTabContent = document.querySelector('.tab-content');
  if (firstTabContent) {
    firstTabContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

function CclTab(props) {
  let {
    activeTab,
    tabTitle,
    onClick,
    tabId,
    routing,
    redirect,
    loginRequired,
    className = '',
    hasSubtab = false,
    currentLocation = '',
  } = props;
  const token = useSelector((state) => state.userSession?.token);
  const location = useLocation();

  function onTabClick(e) {
    scrollToFirstTabContent();
    onClick(tabId);
  }
  const [redirecting, setRedirecting] = React.useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const hasHash = location.hash.length > 1;
    const hasQueryTab = urlParams.has('tab');

    if (hasHash || hasQueryTab) {
      scrollToFirstTabContent();
    }
  }, [activeTab, location.hash.length, location.search]);

  return (
    <div
      className={cx('card ' + className, activeTab === tabId ? 'active ' : '')}
      onClick={(e) => {
        !loginRequired
          ? !hasSubtab && onTabClick(e)
          : loginRequired && token && onTabClick(e);
      }}
      onKeyDown={(e) => {
        !loginRequired
          ? !hasSubtab && onTabClick(e)
          : loginRequired && token && onTabClick(e);
      }}
      tabIndex="0"
      role="button"
      id={tabId}
    >
      {hasSubtab ? (
        <span>{tabTitle}</span>
      ) : loginRequired && !token ? (
        <CclLoginModal
          otherPath={redirect ? redirect : `${currentLocation}#${tabId}`}
          triggerComponent={() => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a style={{ cursor: 'pointer' }}>{tabTitle}</a>
          )}
        />
      ) : routing && !redirect ? (
        <NavLink to={'#' + tabId}>{tabTitle}</NavLink>
      ) : !redirect ? (
        <NavLink to={'#'}>{tabTitle}</NavLink>
      ) : (
        redirect && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            rel="noreferrer"
            role="button"
            onClick={() => setRedirecting(true)}
            onKeyPress={() => setRedirecting(true)}
            tabIndex={0}
            style={{ cursor: 'pointer' }}
          >
            {tabTitle}
            {redirecting && <Redirect push to={redirect} />}
          </a>
        )
      )}
    </div>
  );
}

CclTab.propTypes = {
  activeTab: PropTypes.string,
  tabTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CclTab;
