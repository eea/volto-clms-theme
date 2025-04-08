import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import Cookies from 'universal-cookie';

import { getUser } from '@plone/volto/actions';
import { Logo, Navigation, SearchWidget } from '@plone/volto/components';
import { BodyClass, getCookieOptions } from '@plone/volto/helpers';
import { FontAwesomeIcon } from '@eeacms/volto-clms-utils/components';
import { UniversalLink } from '@plone/volto/components';

import { getCartItems } from '@eeacms/volto-clms-utils/actions';

import CclLoginModal from '@eeacms/volto-clms-theme/components/CclLoginModal/CclLoginModal';
import CclTopMainMenu from '@eeacms/volto-clms-theme/components/CclTopMainMenu/CclTopMainMenu';
import CartIconCounter from '@eeacms/volto-clms-theme/components/CartIconCounter/CartIconCounter';

import usePrevious from '@eeacms/volto-clms-theme/helpers/usePrevious';

import { Loader } from 'semantic-ui-react';

const isInsiteChat = !!process.env.RAZZLE_IS_ASK_COPERNICUS;

// IMPORT isnt nedded until translations are created
// import CclLanguageSelector from '@eeacms/volto-clms-theme/components/CclLanguageSelector/CclLanguageSelector';

const HeaderDropdown = ({ user }) => {
  const intl = useSelector((state) => state.intl);
  return (
    <>
      <span>
        <FontAwesomeIcon
          icon={['fas', 'user']}
          style={{ marginRight: '0.5rem' }}
        />
        {user?.fullname || user?.id || ''}
        <span className="ccl-icon-chevron-thin-down"></span>
      </span>
      <ul>
        <li>
          <Link to={`/${intl.locale}/profile`} className="header-login-link">
            My settings
          </Link>
        </li>
        <li>
          <Link
            to={`/${intl.locale}/cart-downloads`}
            className="header-login-link"
          >
            Downloads
          </Link>
        </li>
        <li>
          <Link
            to={`/${intl.locale}/all-downloads`}
            className="header-login-link"
          >
            Historic downloads
          </Link>
        </li>
        <li>
          <Link to="/logout" className="header-login-link">
            <FormattedMessage id="logout" defaultMessage="Logout" />
          </Link>
        </li>
      </ul>
    </>
  );
};

export default function Header({ pathname }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const userRequest = useSelector((state) => state.users.get);

  const token = useSelector((state) => {
    const jwtToken = state.userSession.token;
    return jwtToken ? jwtDecode(jwtToken).sub : '';
  });
  const isLoadingUser = userRequest?.loading === true;

  const prevToken = usePrevious(token);

  const userId = user?.id;
  const prevUserId = usePrevious(userId);

  React.useEffect(() => {
    if (token && prevToken !== token) {
      dispatch(getUser(token));
    }
    if (prevUserId !== userId) {
      dispatch(getCartItems(userId));
    }
  }, [dispatch, token, prevToken, prevUserId, userId]);

  const apiStatusCode = useSelector(
    (state) => state.apierror?.statusCode?.statusCode,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileSearchBoxOpen, setMobileSearchBoxOpen] = React.useState(false);

  React.useEffect(() => {
    const cookies = new Cookies();
    const query = new URLSearchParams(window.location.search);
    const token = query.get('access_token');
    const auth_token = token ? jwtDecode(token) : null;

    if (auth_token?.sub) {
      cookies.set(
        'auth_token',
        token,
        getCookieOptions({
          expires: new Date(jwtDecode(token).exp * 1000),
        }),
      );
      dispatch(getUser(auth_token.sub));
      query.delete('access_token');
      window.history.replaceState(
        {},
        '',
        query.size > 0
          ? `${window.location.pathname}?${query}${
              window.location.hash && `${window.location.hash}`
            }`
          : `${window.location.pathname}${
              window.location.hash && `${window.location.hash}`
            }`,
      );
      window.location.reload();
    } else {
      if (token) {
        dispatch(getUser(token));
      }
    }
  }, [dispatch]);

  return (
    <>
      {(user?.affiliation === null ||
        user?.country === null ||
        user?.sector_of_activity === null ||
        user?.thematic_activity === null) &&
        !user.roles.includes('Manager') && (
          <Redirect
            to={{
              pathname: '/en/profile',
            }}
          />
        )}
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
                  className={
                    mobileMenuOpen ? 'ccl-icon-close' : 'ccl-icon-menu'
                  }
                ></span>
              </div>
              <div
                className="ccl-search-collapse-button"
                aria-label="Toggle search menu"
                onClick={() => setMobileSearchBoxOpen(!mobileSearchBoxOpen)}
                onKeyDown={() => setMobileSearchBoxOpen(!mobileSearchBoxOpen)}
                tabIndex="0"
                role="button"
              >
                <span className="ccl-icon-zoom"></span>
              </div>

              <div className="ccl-header-tools-container">
                <ul className="ccl-header-menu-tools">
                  {!isInsiteChat && (
                    <>
                      <CclTopMainMenu />
                      <li className="header-vertical-line">
                        <div>|</div>
                      </li>
                      {(token && user?.id && (
                        <>
                          <li className="header-dropdown">
                            <HeaderDropdown user={user} />
                          </li>
                          <li>
                            <CartIconCounter />
                          </li>
                        </>
                      )) || (
                        <li>
                          {apiStatusCode === 401 ? (
                            <CclLoginModal />
                          ) : isLoadingUser ? (
                            <Loader active inline size="mini" />
                          ) : (
                            <CclLoginModal />
                          )}
                        </li>
                      )}
                      <li className="header-vertical-line">
                        <div>|</div>
                      </li>
                    </>
                  )}
                </ul>
                {isInsiteChat ? (
                  <div style={{ width: '10px', height: '10px' }}></div>
                ) : (
                  <div
                    className={
                      mobileSearchBoxOpen
                        ? 'ccl-header-search-show'
                        : 'ccl-header-search-hidden'
                    }
                  >
                    <SearchWidget
                      pathname={pathname}
                      setHeaderState={({ mobileSearchBoxOpen }) =>
                        setMobileSearchBoxOpen(mobileSearchBoxOpen)
                      }
                    />
                  </div>
                )}
                {/* Language selector wont be shown until translations are completed */}
                {/* <CclLanguageSelector /> */}
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
                  <li className="header-vertical-line">
                    <div>|</div>
                  </li>
                  {(user.id && mobileMenuOpen && (
                    <>
                      <li className="header-dropdown">
                        <HeaderDropdown user={user} />
                      </li>
                      <li>
                        <CartIconCounter />
                      </li>
                    </>
                  )) || (
                    <li>
                      {apiStatusCode === 401 ? (
                        <UniversalLink href="/en/login">
                          Register/Login
                        </UniversalLink>
                      ) : isLoadingUser ? (
                        <Loader active inline size="mini" />
                      ) : (
                        <CclLoginModal />
                      )}
                    </li>
                  )}
                  <li className="header-vertical-line">
                    <div>|</div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <hr />
        </header>
      </div>
    </>
  );
}
