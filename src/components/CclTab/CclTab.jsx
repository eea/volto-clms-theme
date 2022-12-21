import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import CclLoginModal from '@eeacms/volto-clms-theme/components/CclLoginModal/CclLoginModal';

import cx from 'classnames';
import PropTypes from 'prop-types';

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
  } = props;
  const token = useSelector((state) => state.userSession?.token);
  function onTabClick() {
    onClick(tabId);
  }
  const [redirecting, setRedirecting] = React.useState(false);
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
          otherPath={redirect ? redirect : undefined}
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
  activeTab: PropTypes.string.isRequired,
  tabTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CclTab;
