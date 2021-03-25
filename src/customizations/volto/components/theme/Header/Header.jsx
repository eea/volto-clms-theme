/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { Component, Link } from 'react';
import { Container, Segment, List, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Anontools,
  LanguageSelector,
  Logo,
  Navigation,
  SearchWidget,
} from '@plone/volto/components';

import { BodyClass, isCmsUi } from '@plone/volto/helpers';
import split from 'lodash/split';
import join from 'lodash/join';
import trim from 'lodash/trim';
import cx from 'classnames';

import CclModal from '@eea/volto-clms-theme/components/CclModal/CclModal'; 

import "./header.less"

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
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const isCmsUI = isCmsUi(this.props.pathname);

    return (
      <header className="ccl-header">
        {/* Body class depending on sections */}
        <BodyClass
          className= 'ccl-style ccl-color_land'
        />

        <div className="ccl-header-tools">
          <div className="ccl-container">
            <div className="ccl-main-menu-collapse-button"><span className="ccl-icon-menu"></span></div>
            <div className="ccl-search-collapse-button"><span className="ccl-icon-zoom"></span></div>
            <div className="ccl-header-tools-container">
              <ul className="ccl-header-menu-tools">
                <li className="header-dropdown">
                  <a href="#">News <span className="ccl-icon-chevron-thin-down"></span></a>
                  <ul>
                    <li><a href="#">Newsletter</a></li>
                  </ul>
                </li>
                <li><a href="#">Work opportunities</a></li>
                <li className="header-dropdown"><a href="#">Technical support <span className="ccl-icon-chevron-thin-down"></span></a>
                  <ul>
                    <li><a href="#">FAQs</a></li>
                    <li><a href="#">Write to service desk</a></li>
                    <li><a href="#">How-to guides</a></li>
                  </ul>
                </li>
                <li className="header-vertical-line"><div>|</div></li>
                <li>
                <CclModal 
                  id="login"
                  trigger=<a className="header-login-link">Login/Register</a>
                >
                  
                  <div className="modal-login-title">Login</div>
                  <div className="modal-login-content">
                    <div className="modal-login-field">
                      <i className="fas fa-user"></i>
                      <input type="text" className="ccl-text-input" placeholder="User name" aria-label="User name" />
                    </div>
                    <div className="modal-login-field">
                      <i className="fas fa-unlock-alt"></i>
                      <input type="password" className="ccl-text-input" placeholder="Password" aria-label="Password" />
                    </div>
                    <a href="./reset-password.html">Forgot your password?</a>
                  </div>
                  <button className="ccl-button ccl-button-green modal-login-button">Login</button>
                  <hr />
                  <div className="modal-login-title">New user</div>
                  <div className="modal-login-text">
                    Registration is free. Personal data will only be used internally. For more details, see the <a href="./personal-data-protection.html" target="_blank">Personal data protection</a>.
                  </div>
                  <a href="./register.html" className="ccl-button ccl-button--default">Register</a>
                </CclModal>
                </li>
              </ul>
              <SearchWidget pathname={this.props.pathname} />
              <LanguageSelector />
            </div>
          </div>
        </div>
        <div className="ccl-header-nav ">
          <div className="ccl-container">
            <Logo />
            <Navigation pathname={this.props.pathname} />
          </div>
        </div>
      </header>
    );
  }
}

export default connect((state) => ({
  token: state.userSession.token,
}))(Header);
