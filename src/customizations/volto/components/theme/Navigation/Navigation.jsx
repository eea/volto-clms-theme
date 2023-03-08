/**
 * Navigation components.
 * @module components/theme/Navigation/Navigation
 */
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { compose } from 'redux';
import { Menu } from 'semantic-ui-react';

import { getNavigation } from '@plone/volto/actions';
import NavItems from '@plone/volto/components/theme/Navigation/NavItems';
import { BodyClass, getBaseUrl, hasApiExpander } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

import PropTypes from 'prop-types';

/**
 * Navigation container class.
 * @class Navigation
 * @extends Component
 */

class Navigation extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getNavigation: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      }),
    ).isRequired,
    lang: PropTypes.string.isRequired,
  };

  static defaultProps = {
    token: null,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Navigation
   */
  constructor(props) {
    super(props);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.closeMobileMenu = this.closeMobileMenu.bind(this);
    this.state = {
      isMobileMenuOpen: false,
    };
  }

  componentDidMount() {
    const { settings } = config;
    if (!hasApiExpander('navigation', getBaseUrl(this.props.pathname))) {
      this.props.getNavigation(
        getBaseUrl(this.props.pathname),
        settings.navDepth,
      );
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { settings } = config;
    if (
      nextProps.pathname !== this.props.pathname ||
      nextProps.token !== this.props.token
    ) {
      if (!hasApiExpander('navigation', getBaseUrl(this.props.pathname))) {
        this.props.getNavigation(
          getBaseUrl(nextProps.pathname),
          settings.navDepth,
        );
      }
    }
  }

  /**
   * Toggle mobile menu's open state
   * @method toggleMobileMenu
   * @returns {undefined}
   */
  toggleMobileMenu() {
    this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen });
  }

  /**
   * Close mobile menu
   * @method closeMobileMenu
   * @returns {undefined}
   */
  closeMobileMenu() {
    this.setState({ isMobileMenuOpen: false });
    this.props.setHeaderState({
      mobileMenuOpen: false,
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { lang } = this.props;

    return (
      <nav className="navigation" id="navigation" aria-label="navigation">
        <ul className="ccl-header-main-menu">
          {this?.props?.items?.map((item) => (
            <li key={item.url}>
              <NavLink
                to={item.url === '' ? '/' : item.url}
                key={item.url}
                activeClassName="active"
                exact={
                  config.settings.isMultilingual
                    ? item.url === `/${lang}`
                    : item.url === ''
                }
                onClick={this.closeMobileMenu}
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <CSSTransition
          in={this.state.isMobileMenuOpen}
          timeout={500}
          classNames="mobile-menu"
          unmountOnExit
        >
          <div key="mobile-menu-key" className="mobile-menu">
            <BodyClass className="has-mobile-menu-open" />
            <div className="mobile-menu-nav">
              <Menu stackable pointing secondary onClick={this.closeMobileMenu}>
                <NavItems items={this.props.items} lang={this.props.lang} />
              </Menu>
            </div>
          </div>
        </CSSTransition>
      </nav>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state) => ({
      token: state.userSession.token,
      items: state.navigation.items,
      lang: state.intl.locale,
    }),
    { getNavigation },
  ),
)(Navigation);
