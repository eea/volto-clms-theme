/**
 * CLMSProfileView container.
 * @module components/CLMSProfileView/CLMSProfileView
 */

import {
  CLMSApiTokensView,
  CLMSUserProfileView,
  CLMSNewsletterView,
} from '@eeacms/volto-clms-theme/components/CLMSProfileView';
import React, { Component } from 'react';
import { getUser, updateUser } from '@plone/volto/actions';

import CclTabs from '@eeacms/volto-clms-theme/components/CclTab/CclTabs';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getBaseUrl } from '@plone/volto/helpers';
import { getExtraBreadcrumbItems } from '../../actions';
import jwtDecode from 'jwt-decode';

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
    user: PropTypes.shape({
      '@id': PropTypes.string,
      are_you_registering_on_behalf_on_an_organisation_: PropTypes.bool,
      country: PropTypes.string,
      email: PropTypes.string,
      fullname: PropTypes.string,
      how_do_you_intend_to_use_the_products: PropTypes.arrayOf(
        PropTypes.string,
      ),
      id: PropTypes.string,
      organisation_institutional_domain: PropTypes.arrayOf(PropTypes.string),
      organisation_name: PropTypes.string,
      organisation_url: PropTypes.string,
      professional_thematic_domain: PropTypes.arrayOf(PropTypes.string),
      roles: PropTypes.array,
      username: PropTypes.string,
      return_url: PropTypes.string,
    }),
    userId: PropTypes.string,
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
    this.props.getExtraBreadcrumbItems([
      {
        title: 'Profile',
        pathname: this.props.location.pathname,
      },
    ]);
    return (
      <div className="ccl-container ">
        {loggedIn && (
          <>
            <CclTabs>
              <div tabTitle="USER PROFILE">
                {CLMSUserProfileView(this.props.content)}
              </div>
              <div tabTitle="API TOKENS">
                {CLMSApiTokensView(this.props.content)}
              </div>
              <div tabTitle="SUBSCRIBE TO NEWSLETTER">
                {CLMSNewsletterView(this.props.content)}
              </div>
            </CclTabs>
          </>
        )}
      </div>
    );
  }
}

export default compose(
  connect(
    (state) => ({
      user: state.users.user,
      userId: state.userSession.token
        ? jwtDecode(state.userSession.token).sub
        : '',
    }),
    { getUser, updateUser, getBaseUrl, getExtraBreadcrumbItems },
  ),
)(CLMSProfileView);
