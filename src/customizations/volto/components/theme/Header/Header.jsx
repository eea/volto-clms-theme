/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/**
 * Header component.
 * @module components/theme/Header/Header
 */

import '@eeacms/volto-clms-theme/../theme/clms/css/header.css';

import { FormattedMessage, injectIntl } from 'react-intl';
import { Logo, Navigation, SearchWidget } from '@plone/volto/components';
import React, { Component, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import { BodyClass } from '@plone/volto/helpers';
// IMPORT isnt nedded until translations are created
// import CclLanguageSelector from '@eeacms/volto-clms-theme/components/CclLanguageSelector/CclLanguageSelector';
import CclLoginModal from '@eeacms/volto-clms-theme/components/CclLoginModal/CclLoginModal';
import CclTopMainMenu from '@eeacms/volto-clms-theme/components/CclTopMainMenu/CclTopMainMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { getCartItems } from '@eeacms/volto-clms-utils/actions';
import { getUser } from '@plone/volto/actions';
import jwtDecode from 'jwt-decode';

const CartIconCounter = (props) => {
  const cart = useSelector((state) => state.cart_items.items);
  const intl = useSelector((state) => state.intl);
  const user_id = useSelector((state) => state.users.user.id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItems(user_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);
  return (
    cart && (
      <Link to={`/${intl.locale}/cart`} className="header-login-link">
        <FontAwesomeIcon
          icon={['fas', 'shopping-cart']}
          style={{ marginRight: '0.25rem', maxWidth: '1.5rem' }}
        />
        <strong>{cart?.length}</strong>
      </Link>
    )
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
    this.props.getUser(this.props.token);
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
                  {(this.props.user?.id && (
                    <>
                      <li className="header-dropdown">
                        <>
                          <span>
                            <FontAwesomeIcon
                              icon={['fas', 'user']}
                              style={{ marginRight: '0.5rem' }}
                            />
                            {this.props.user?.fullname ||
                              this.props.user?.id ||
                              ''}
                            <span className="ccl-icon-chevron-thin-down"></span>
                          </span>
                          <ul>
                            <li>
                              <Link
                                to={`/${this.props.locale}/profile`}
                                className="header-login-link"
                              >
                                My settings
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`/${this.props.locale}/cart-downloads`}
                                className="header-login-link"
                              >
                                Downloads
                              </Link>
                            </li>
                            <li>
                              <Link to="/logout" className="header-login-link">
                                <FormattedMessage
                                  id="logout"
                                  defaultMessage="Logout"
                                />
                              </Link>
                            </li>
                          </ul>
                        </>
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
                <Navigation pathname={this.props.pathname} />
                <ul className="ccl-header-menu-tools ccl-collapsible-toolmenu">
                  <CclTopMainMenu></CclTopMainMenu>
                  <li className="header-vertical-line">
                    <div>|</div>
                  </li>
                  {(this.props.user.id && (
                    <>
                      <li className="header-dropdown">
                        <>
                          <span>
                            <FontAwesomeIcon
                              icon={['fas', 'user']}
                              style={{ marginRight: '0.5rem' }}
                            />
                            {this.props.user.fullname ||
                              this.props.user.id ||
                              ''}
                            <span className="ccl-icon-chevron-thin-down"></span>
                          </span>
                          <ul>
                            <li>
                              <Link
                                to={`/${this.props.locale}/profile`}
                                className="header-login-link"
                              >
                                {this.props.user.id && <>{'My settings'}</>}
                              </Link>
                            </li>
                            <li>
                              <Link to="/logout" className="header-login-link">
                                <FormattedMessage
                                  id="logout"
                                  defaultMessage="Logout"
                                />
                              </Link>
                            </li>
                          </ul>
                        </>
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
