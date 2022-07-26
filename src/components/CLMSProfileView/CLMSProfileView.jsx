/**
 * CLMSProfileView container.
 * @module components/CLMSProfileView/CLMSProfileView
 */

import {
  AVAILABLE_SUBSCRIPTIONS,
  SubscriptionView,
} from '@eeacms/volto-clms-theme/components/CLMSSubscriptionView';
import {
  CLMSApiTokensView,
  CLMSNewsletterSubscriberView,
  CLMSUserProfileView,
} from '@eeacms/volto-clms-theme/components/CLMSProfileView';
import React, { Component } from 'react';

import CclTabs from '@eeacms/volto-clms-theme/components/CclTab/CclTabs';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getExtraBreadcrumbItems } from '../../actions';
import jwtDecode from 'jwt-decode';
import { Unauthorized } from '@plone/volto/components';
import { Helmet } from '@plone/volto/helpers';

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
        <Helmet title="User profile"></Helmet>
        {loggedIn ? (
          <CclTabs>
            <div tabTitle="User profile">
              <CLMSUserProfileView />
            </div>
            <div tabTitle="API tokens">
              <CLMSApiTokensView />
            </div>
            {(this.props.roles?.includes('Manager') ||
              this.props.roles?.includes('Site Administrator')) && (
              <div tabTitle="Newsletter subscribers">
                <CLMSNewsletterSubscriberView />
              </div>
            )}
            {AVAILABLE_SUBSCRIPTIONS.map((subscription) => (
              <div tabTitle={subscription?.title} key={subscription?.title}>
                <SubscriptionView type={subscription?.type} />
              </div>
            ))}
          </CclTabs>
        ) : (
          <Unauthorized />
        )}
      </div>
    );
  }
}
export default compose(
  connect(
    (state) => ({
      roles: state.users.user.roles,
      userId: state.userSession.token
        ? jwtDecode(state.userSession.token).sub
        : '',
    }),
    { getExtraBreadcrumbItems },
  ),
)(CLMSProfileView);
