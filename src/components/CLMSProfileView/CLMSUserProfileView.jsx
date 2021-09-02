/**
 * CLMSProfileView container.
 * @module components/CLMSProfileView/CLMSProfileView
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { defineMessages, injectIntl } from 'react-intl';
import jwtDecode from 'jwt-decode';
import { Form, Toast } from '@plone/volto/components';
import { toast } from 'react-toastify';
import { getUser, updateUser } from '@plone/volto/actions';
import { getBaseUrl } from '@plone/volto/helpers';
import { Container } from 'semantic-ui-react';

const messages = defineMessages({
  UserProfile: {
    id: 'UserProfile',
    defaultMessage: 'User Profile',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  fullnameTitle: {
    id: 'Full Name',
    defaultMessage: 'Full Name',
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
    getUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    getBaseUrl: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getUser(this.props.userId);
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
            <h1 className="page-title">
              {this.props.intl.formatMessage(messages.UserProfile)}
            </h1>
            <div>
              {this.props.loaded && (
                <Form
                  formData={this.props.user}
                  schema={{
                    fieldsets: [
                      {
                        id: 'default',
                        title: this.props.intl.formatMessage(messages.default),
                        fields: ['fullname', 'email', 'portrait', 'location'],
                      },
                    ],
                    properties: {
                      fullname: {
                        description: this.props.intl.formatMessage(
                          messages.fullnameDescription,
                        ),
                        title: this.props.intl.formatMessage(
                          messages.fullnameTitle,
                        ),
                        type: 'string',
                      },
                      email: {
                        description: this.props.intl.formatMessage(
                          messages.emailDescription,
                        ),
                        title: this.props.intl.formatMessage(
                          messages.emailTitle,
                        ),
                        type: 'string',
                      },
                      portrait: {
                        description: this.props.intl.formatMessage(
                          messages.portraitDescription,
                        ),
                        title: this.props.intl.formatMessage(
                          messages.portraitTitle,
                        ),
                        type: 'object',
                      },
                      location: {
                        description: this.props.intl.formatMessage(
                          messages.locationDescription,
                        ),
                        title: this.props.intl.formatMessage(
                          messages.locationTitle,
                        ),
                        type: 'string',
                      },
                    },
                    required: ['email'],
                  }}
                  onSubmit={this.onSubmit}
                  onCancel={this.onCancel}
                  loading={this.props.loading}
                />
              )}
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
    }),
    { getUser, updateUser, getBaseUrl },
  ),
)(CLMSUserProfileView);
