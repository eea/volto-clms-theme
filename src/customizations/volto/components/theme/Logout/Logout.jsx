/**
 * Login container.
 * @module components/theme/Logout/Logout
 */

import { Component } from 'react';
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
    // eslint-disable-next-line no-restricted-globals
    this.props.logout().then(history.back(1));
    this.props.purgeMessages();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return '';
  }
}

export default connect(
  (state, props) => ({
    query: qs.parse(props.location.search),
  }),
  { logout, purgeMessages },
)(CclLogout);
