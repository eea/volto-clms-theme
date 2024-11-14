import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Unauthorized } from '@plone/volto/components';
import { Helmet } from '@plone/volto/helpers';
import CclTabs from '@eeacms/volto-clms-theme/components/CclTab/CclTabs';
import { helmetTitle } from '@eeacms/volto-clms-theme/components/CclUtils';
import {
  CLMSApiTokensView,
  CLMSUserProfileView,
  CLMSDeleteProfileView,
} from '@eeacms/volto-clms-theme/components/CLMSProfileView';

import { getExtraBreadcrumbItems } from '../../actions';

import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

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
    userId: PropTypes.string,
  };
  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const loggedIn = !!this.props.userId;
    this.props.getExtraBreadcrumbItems([
      {
        title: 'Profile',
        pathname: this.props.location.pathname,
      },
    ]);

    return (
      <div className="ccl-container ">
        <Helmet
          title={helmetTitle('User profile', this.props.content)}
        ></Helmet>
        {loggedIn ? (
          <CclTabs routing={true}>
            <div tabTitle="User profile">
              <CLMSUserProfileView />
            </div>
            <div tabTitle="API tokens">
              <CLMSApiTokensView />
            </div>
            <div tabTitle="Delete profile">
              <CLMSDeleteProfileView />
            </div>
          </CclTabs>
        ) : (
          <Unauthorized />
        )}
      </div>
    );
  }
}
export default compose(
  injectIntl,
  connect(
    (state) => ({
      roles: state.users.user.roles,
      userId: state.userSession.token
        ? jwtDecode(state.userSession.token).sub
        : '',
      content: state.content.data,
    }),
    { getExtraBreadcrumbItems },
  ),
)(CLMSProfileView);
