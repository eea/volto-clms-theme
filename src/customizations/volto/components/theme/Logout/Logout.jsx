/**
 * Login container.
 * @module components/theme/Logout/Logout
 */

import React, { Component } from 'react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import CclLoginModal from '@eeacms/volto-clms-theme/components/CclLoginModal/CclLoginModal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'query-string';
import { logout, purgeMessages } from '@plone/volto/actions';

/**
 * Logout class.
 * @class Logout
 * @extends Component
 */
class CclLogout extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    logout: PropTypes.func.isRequired,
    purgeMessages: PropTypes.func.isRequired,
    query: PropTypes.shape({
      return_url: PropTypes.string,
    }),
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    query: null,
  };

  componentDidMount() {
    this.props.logout();
    this.props.purgeMessages();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div id="page-document" className="ui container">
        <h1 className="page-title">{'LOG OUT'}</h1>
        <div className="event-detail">
          <div className="event-detail-content">
            <p>{'You have logged out correctly'}</p>
          </div>
          <CclButton mode={'filled'}>
            <CclLoginModal />
          </CclButton>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, props) => ({
    query: qs.parse(props.location.search),
  }),
  { logout, purgeMessages },
)(CclLogout);
