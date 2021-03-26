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
import CclLanguageSelector from '@eea/volto-clms-theme/components/CclLanguageSelector/CclLanguageSelector'; 

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

  constructor(props) {
    super(props);
    this.state = {
      mobileMenuOpen: false,
      mobileSearchBoxOpen: false
    };
  }


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
            <div className="ccl-main-menu-collapse-button" onClick={() => this.setState({ mobileMenuOpen: !this.state.mobileMenuOpen })}><span className="ccl-icon-menu"></span></div>
            <div className="ccl-search-collapse-button" onClick={() => this.setState({ mobileSearchBoxOpen: !this.state.mobileSearchBoxOpen })}><span className="ccl-icon-zoom"></span></div>
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
                    trigger=<a className="header-login-link">Login/Register</a>
                    size="tiny"
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
              <div onMouseOut={(e)=> {this.setState({ mobileSearchBoxOpen: false })}} className={this.state.mobileSearchBoxOpen ? 'ccl-header-search-show' : 'ccl-header-search-hidden'}> 
                <SearchWidget pathname={this.props.pathname} />
              </div> 
              <CclLanguageSelector />
            </div>
          </div>
        </div>
        <div className="ccl-header-nav ">
          <div className="ccl-container">
            <Logo />
            <nav className={this.state.mobileMenuOpen ? "ccl-main-menu ccl-collapsible-open" : "ccl-main-menu"}>
              <Navigation pathname={this.props.pathname} />
              <ul className="ccl-header-menu-tools ccl-collapsible-toolmenu">
              <li className="header-dropdown"><a href="./news.html">News<span className="ccl-icon-chevron-thin-down"></span></a>
                <ul>
                  <li><a href="./newsletter.html">Newsletter</a></li>
                </ul>
              </li>
              <li><a href="./work-opportunities.html">Work opportunities</a></li>
              <li className="header-dropdown"><span>Technical support<span className="ccl-icon-chevron-thin-down"></span></span>
                <ul>
                  <li><a href="./faq/faq-general.html">FAQs</a></li>
                  <li><a href="./service-desk.html">Write to service desk</a></li>
                  <li><a href="./guides.html">How-to guides</a></li>
                </ul>
              </li>
              <li className="header-vertical-line"><div>|</div></li>
              <li><span className="header-login-link">Login/Register</span></li>
            </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

export default connect((state) => ({
  token: state.userSession.token,
}))(Header);
