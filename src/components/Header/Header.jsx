import React from 'react';
import { Logo, Navigation } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '@plone/volto/actions';
import usePrevious from '@eeacms/volto-clms-theme/helpers/usePrevious';
import jwtDecode from 'jwt-decode';

import CclTopMainMenu from '@eeacms/volto-clms-theme/components/CclTopMainMenu/CclTopMainMenu';

export default function Header({ pathname }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  const token = useSelector((state) => {
    const jwtToken = state.userSession.token;
    return jwtToken ? jwtDecode(jwtToken).sub : '';
  });

  const prevToken = usePrevious(token);

  const userId = user?.id;
  const prevUserId = usePrevious(userId);

  React.useEffect(() => {
    if (token && prevToken !== token) {
      dispatch(getUser(token));
    }
  }, [dispatch, token, prevToken, prevUserId, userId]);

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div>
      <header className="ccl-header">
        {/* Body class depending on sections */}
        <BodyClass className="ccl-style ccl-color_land" />

        <div className="ccl-header-tools">
          <div className="ccl-container">
            <div
              className="ccl-main-menu-collapse-button"
              aria-label="Toggle main menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onKeyDown={() => setMobileMenuOpen(!mobileMenuOpen)}
              tabIndex="0"
              role="button"
            >
              <span
                className={mobileMenuOpen ? 'ccl-icon-close' : 'ccl-icon-menu'}
              ></span>
            </div>

            <div className="ccl-header-tools-container">
              <div style={{ width: '10px', height: '10px' }}></div>
            </div>
          </div>
        </div>
        <div className="ccl-header-nav ">
          <div className="ccl-container">
            <Logo />
            <nav
              className={
                mobileMenuOpen
                  ? 'ccl-main-menu ccl-collapsible-open'
                  : 'ccl-main-menu'
              }
            >
              <Navigation
                pathname={pathname}
                setHeaderState={({ mobileMenuOpen }) =>
                  setMobileMenuOpen(mobileMenuOpen)
                }
              />
              <ul className="ccl-header-menu-tools ccl-collapsible-toolmenu">
                <CclTopMainMenu />
              </ul>
            </nav>
          </div>
        </div>
        <hr />
      </header>
    </div>
  );
}
