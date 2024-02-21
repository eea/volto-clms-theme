/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/**
 * Header component.
 * @module components/theme/Header/Header
 */

import { FormattedMessage, injectIntl } from 'react-intl';
import { Logo, Navigation, SearchWidget } from '@plone/volto/components';
import React, { Component } from 'react';
import { connect, useSelector } from 'react-redux';

import { BodyClass, getCookieOptions } from '@plone/volto/helpers';
// IMPORT isnt nedded until translations are created
// import CclLanguageSelector from '@eeacms/volto-clms-theme/components/CclLanguageSelector/CclLanguageSelector';
import CclLoginModal from '@eeacms/volto-clms-theme/components/CclLoginModal/CclLoginModal';
import CclTopMainMenu from '@eeacms/volto-clms-theme/components/CclTopMainMenu/CclTopMainMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { getCartItems } from '@eeacms/volto-clms-utils/actions';
import { getUser, loginRenew } from '@plone/volto/actions';
import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';

import CartIconCounter from '@eeacms/volto-clms-theme/components/CartIconCounter/CartIconCounter';

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

/**
 * Header component class.
 * @class Header
 * @extends Component
 */

class Header extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    token: PropTypes.string,
    pathname: PropTypes.string.isRequired,
    user: PropTypes.shape({
      fullname: PropTypes.string,
      email: PropTypes.string,
      home_page: PropTypes.string,
      location: PropTypes.string,
      roles: PropTypes.array,
    }).isRequired,
    getUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
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
      this.props.getUser(auth_token.sub);
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
      this.props.loginRenew();
    } else {
      this.props.getUser(this.props.token);
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.token !== this.props.token) {
      this.props.getUser(nextProps.token);
    }
    if (nextProps.user.id !== this.props.user.id) {
      this.props.getCartItems(this.props?.user?.id);
    }
  }

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      mobileMenuOpen: false,
      mobileSearchBoxOpen: false,
    };
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    console.log('this.props', this.props);
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
                onClick={() =>
                  this.setState({
                    mobileMenuOpen: !this.state.mobileMenuOpen,
                  })
                }
                onKeyDown={() =>
                  this.setState({
                    mobileMenuOpen: !this.state.mobileMenuOpen,
                  })
                }
                tabIndex="0"
                role="button"
              >
                <span
                  className={
                    this.state.mobileMenuOpen
                      ? 'ccl-icon-close'
                      : 'ccl-icon-menu'
                  }
                ></span>
              </div>
              <div
                className="ccl-search-collapse-button"
                aria-label="Toggle search menu"
                onClick={() =>
                  this.setState({
                    mobileSearchBoxOpen: !this.state.mobileSearchBoxOpen,
                  })
                }
                onKeyDown={() =>
                  this.setState({
                    mobileSearchBoxOpen: !this.state.mobileSearchBoxOpen,
                  })
                }
                tabIndex="0"
                role="button"
              >
                <span className="ccl-icon-zoom"></span>
              </div>

              <div className="ccl-header-tools-container">
                <ul className="ccl-header-menu-tools">
                  <CclTopMainMenu></CclTopMainMenu>
                  <li className="header-vertical-line">
                    <div>|</div>
                  </li>
                  {(this.props.token && this.props.user?.id && (
                    <>
                      <li className="header-dropdown">
                        <HeaderDropdown user={this.props.user} />
                      </li>
                      <li>
                        <CartIconCounter />
                      </li>
                    </>
                  )) || (
                    <li>
                      <CclLoginModal />
                    </li>
                  )}
                  <li className="header-vertical-line">
                    <div>|</div>
                  </li>
                </ul>
                <div
                  className={
                    this.state.mobileSearchBoxOpen
                      ? 'ccl-header-search-show'
                      : 'ccl-header-search-hidden'
                  }
                >
                  <SearchWidget
                    pathname={this.props.pathname}
                    setHeaderState={(p) => {
                      this.setState(p);
                    }}
                  />
                </div>
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
                  this.state.mobileMenuOpen
                    ? 'ccl-main-menu ccl-collapsible-open'
                    : 'ccl-main-menu'
                }
              >
                <Navigation
                  pathname={this.props.pathname}
                  setHeaderState={(p) => {
                    this.setState(p);
                  }}
                />
                <ul className="ccl-header-menu-tools ccl-collapsible-toolmenu">
                  <CclTopMainMenu></CclTopMainMenu>
                  <li className="header-vertical-line">
                    <div>|</div>
                  </li>
                  {(this.props.user.id && this.state.mobileMenuOpen && (
                    <>
                      <li className="header-dropdown">
                        <HeaderDropdown user={this.props.user} />
                      </li>
                      <li>
                        <CartIconCounter />
                      </li>
                    </>
                  )) || (
                    <li>
                      <CclLoginModal />
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
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state) => ({
      locale: state.intl.locale,
      cart: state.cart_items.items,
      user: state.users.user,
      token: state.userSession.token
        ? jwtDecode(state.userSession.token).sub
        : '',
      rawtoken: state.userSession.token,
    }),
    { getUser, getCartItems, loginRenew },
  ),
)(Header);
