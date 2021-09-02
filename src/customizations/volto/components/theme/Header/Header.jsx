/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Logo, Navigation, SearchWidget } from '@plone/volto/components';
import jwtDecode from 'jwt-decode';
import { getUser } from '@plone/volto/actions';
import { compose } from 'redux';

import { BodyClass } from '@plone/volto/helpers';

import CclLanguageSelector from '@eeacms/volto-clms-theme/components/CclLanguageSelector/CclLanguageSelector';
import CclTopMainMenu from '@eeacms/volto-clms-theme/components/CclTopMainMenu/CclTopMainMenu';

import './header.less';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { CART_SESSION_KEY } from '@eeacms/volto-clms-theme/utils/useCartState';
import { getCartItems } from '@eeacms/volto-clms-theme/actions';
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
    this.props.getUser(this.props.token);
    this.props.getCartItems(this.props.rawtoken);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.token !== this.props.token) {
      this.props.getUser(nextProps.token);
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
    return (
      <div>
        <header className="ccl-header">
          {/* Body class depending on sections */}
          <BodyClass className="ccl-style ccl-color_land" />

          <div className="ccl-header-tools">
            <div className="ccl-container">
              <div
                className="ccl-main-menu-collapse-button"
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
                <span className="ccl-icon-menu"></span>
              </div>
              <div
                className="ccl-search-collapse-button"
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
                  <li>
                    {(this.props.user.id && (
                      <>
                        <a
                          href={`/${this.props.locale}/profile`}
                          className="header-login-link"
                        >
                          {this.props.user.id && (
                            <>
                              <FormattedMessage
                                id="hello"
                                defaultMessage="Hello "
                              />
                              {this.props.user.fullname ||
                                this.props.user.id ||
                                ''}
                            </>
                          )}
                        </a>
                        {this.props.cart?.length !== 0 && this.props.cart && (
                          <>
                            <span className="header-vertical-line"> - </span>
                            <span>
                              <a
                                href={`/${this.props.locale}/cart`}
                                className="header-login-link"
                              >
                                <FontAwesomeIcon
                                  icon={['fas', 'shopping-cart']}
                                />
                                <strong>{this.props.cart?.length}</strong>
                              </a>
                            </span>
                          </>
                        )}
                        {this.props.user.id &&
                          this.props.user.roles &&
                          this.props.user.roles[0] === 'Member' && (
                            <>
                              <span className="header-vertical-line"> - </span>
                              <a href="/logout" className="header-login-link">
                                <FormattedMessage
                                  id="logout"
                                  defaultMessage="Logout"
                                />
                              </a>
                            </>
                          )}
                      </>
                    )) || (
                      <a
                        href={`/${this.props.locale}/login`}
                        className="header-login-link"
                      >
                        <FormattedMessage
                          id="loginRegister"
                          defaultMessage="Login/Register"
                        />
                      </a>
                    )}
                  </li>
                </ul>
                <div
                  onMouseOut={(e) => {
                    this.setState({ mobileSearchBoxOpen: false });
                  }}
                  onBlur={(e) => {
                    this.setState({ mobileSearchBoxOpen: false });
                  }}
                  className={
                    this.state.mobileSearchBoxOpen
                      ? 'ccl-header-search-show'
                      : 'ccl-header-search-hidden'
                  }
                >
                  <SearchWidget pathname={this.props.pathname} />
                </div>
                <CclLanguageSelector />
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
                <Navigation pathname={this.props.pathname} />
                <ul className="ccl-header-menu-tools ccl-collapsible-toolmenu">
                  <CclTopMainMenu></CclTopMainMenu>
                  <li className="header-vertical-line">
                    <div>|</div>
                  </li>
                  {(this.props.user.id && (
                    <>
                      <li>
                        <a
                          href={`/${this.props.locale}/profile`}
                          className="header-login-link"
                        >
                          {this.props.user.id && (
                            <>
                              <FormattedMessage
                                id="hello"
                                defaultMessage="Hello "
                              />
                              {this.props.user.fullname ||
                                this.props.user.id ||
                                ''}
                            </>
                          )}
                        </a>
                      </li>

                      {this.props.user.id &&
                        this.props.user.roles &&
                        this.props.user.roles[0] === 'Member' && (
                          <li>
                            <a href="/logout" className="header-login-link">
                              <FormattedMessage
                                id="logout"
                                defaultMessage="Logout"
                              />
                            </a>
                          </li>
                        )}
                    </>
                  )) || (
                    <li>
                      <a
                        href={`/${this.props.locale}/login`}
                        className="header-login-link"
                      >
                        <FormattedMessage
                          id="loginRegister"
                          defaultMessage="Login/Register"
                        />
                      </a>
                    </li>
                  )}
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
    { getUser, getCartItems },
  ),
)(Header);
