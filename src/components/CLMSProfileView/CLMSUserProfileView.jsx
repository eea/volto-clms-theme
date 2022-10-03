import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { compose } from 'redux';
import { Container } from 'semantic-ui-react';

import { getUser, updateUser } from '@plone/volto/actions';
import { UniversalLink } from '@plone/volto/components';
import { Form, Toast } from '@plone/volto/components';
import { getBaseUrl } from '@plone/volto/helpers';

import { getUserSchema } from '../../actions';

import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

/**
 * CLMSProfileView container.
 * @module components/CLMSProfileView/CLMSProfileView
 */

const messages = defineMessages({
  UserProfile: {
    id: 'UserProfile',
    defaultMessage: 'User profile',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  fullnameTitle: {
    id: 'Full Name',
    defaultMessage: 'Full name',
  },
  fullnameDescription: {
    id: 'Enter full name, e.g. John Smith.',
    defaultMessage: 'Enter full name, e.g. John Smith.',
  },
  emailTitle: {
    id: 'E-mail',
    defaultMessage: 'E-mail',
  },
  emailDescription: {
    id: 'We will use this address if you need to recover your password',
    defaultMessage:
      'We will use this address if you need to recover your password',
  },
  portraitTitle: {
    id: 'Portrait',
    defaultMessage: 'Portrait',
  },
  portraitDescription: {
    id: 'The user portrait/avatar',
    defaultMessage: 'The user portrait/avatar',
  },
  locationTitle: {
    id: 'Location',
    defaultMessage: 'Location',
  },
  locationDescription: {
    id:
      'Your location - either city and country - or in a company setting, where your office is located.',
    defaultMessage:
      'Your location - either city and country - or in a company setting, where your office is located.',
  },
  saved: {
    id: 'Changes saved',
    defaultMessage: 'Changes saved',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
});

/**
 * CLMSProfileView class.
 * @class CLMSProfileView
 * @extends Component
 */
class CLMSUserProfileView extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
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
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    getUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    getBaseUrl: PropTypes.func.isRequired,
    getUserSchema: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getUser(this.props.userId);
    this.props.getUserSchema();
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  onSubmit(data) {
    // We don't want the user to change his login name/username or the roles
    // from this form
    // Backend will complain anyways, but we clean the data here before it does
    delete data.id;
    delete data.username;
    delete data.roles;
    this.props.updateUser(this.props.userId, data);
    toast.success(
      <Toast
        success
        title={this.props.intl.formatMessage(messages.success)}
        content={this.props.intl.formatMessage(messages.saved)}
      />,
    );
  }

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
          <Container>
            <div>
              <h1 className="page-title">
                {this.props.intl.formatMessage(messages.UserProfile)}
              </h1>
              <p>
                Use this form to update your profile details. Be aware that if
                you change your fullname and e-mail address they will be
                rewriten when you log in again next time. This is because we are
                using EU Login to enter this site. <br />
                If you want to change your fullname and e-mail address, please
                do so in your{' '}
                <UniversalLink href={'https://ecas.ec.europa.eu/cas/'}>
                  EU Login account
                </UniversalLink>
                .
              </p>
              <div>
                {this.props?.userschema?.loaded && (
                  <Form
                    formData={this.props.user}
                    schema={this.props.userschema.userschema}
                    onSubmit={this.onSubmit.bind(this)}
                    onCancel={this.onCancel}
                    loading={this.props.userschema.loading}
                  />
                )}
              </div>
            </div>
          </Container>
        )}
      </>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      user: state.users.user,
      userId: state.userSession.token
        ? jwtDecode(state.userSession.token).sub
        : '',
      loaded: state.users.get.loaded,
      loading: state.users.update.loading,
      userschema: state.userschema,
    }),
    { getUser, updateUser, getBaseUrl, getUserSchema },
  ),
)(CLMSUserProfileView);
