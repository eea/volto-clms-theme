/**
 * CLMSProfileView container.
 * @module components/CLMSProfileView/CLMSProfileView
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'query-string';
import { compose } from 'redux';
import jwtDecode from 'jwt-decode';
import { getUser, updateUser } from '@plone/volto/actions';
import { getBaseUrl } from '@plone/volto/helpers';
import CclTabs from '@eeacms/volto-clms-theme/components/CclTab/CclTabs';
import {
  CLMSUserProfileView,
  CLMSApiTokensView,
} from '@eeacms/volto-clms-theme/components/CLMSProfileView';

/**
 * CLMSProfileView class.
 * @class CLMSProfileView
 * @extends Component
 */
class CLMSProfileView extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    content: PropTypes.object,
    children: PropTypes.instanceOf(Array),
    lang: PropTypes.string,
    user: PropTypes.shape({
      '@id': PropTypes.string,
      description: PropTypes.string,
      email: PropTypes.string,
      fullname: PropTypes.string,
      id: PropTypes.string,
      location: PropTypes.string,
      nickname: PropTypes.string,
      portrait: PropTypes.string,
      roles: PropTypes.array,
      username: PropTypes.string,
      return_url: PropTypes.string,
    }),
    userId: PropTypes.string,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    returnUrl: PropTypes.string,
    pathname: PropTypes.string,
    getUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    getBaseUrl: PropTypes.func.isRequired,
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const loggedIn = !!this.props.userId;
    return (
      <>
        {loggedIn && (
          <>
            <CclTabs>
              <div tabTitle="USER PROFILE">
                {CLMSUserProfileView(this.props.content)}
              </div>
              <div tabTitle="API TOKENS">
                {CLMSApiTokensView(this.props.content)}
              </div>
            </CclTabs>
          </>
        )}
        ;
      </>
    );
  }
}

export default compose(
  connect(
    (state, props) => ({
      lang: state.intl.locale,
      user: state.users.user,
      userId: state.userSession.token
        ? jwtDecode(state.userSession.token).sub
        : '',
      loaded: state.users.get.loaded,
      loading: state.users.update.loading,
      returnUrl: qs.parse(props.location.search).return_url,
      pathname: props.location.pathname,
    }),
    { getUser, updateUser, getBaseUrl },
  ),
)(CLMSProfileView);
