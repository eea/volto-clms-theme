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
import { Icon, Toast } from '@plone/volto/components';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import { toast } from 'react-toastify';
import { getUser, updateUser } from '@plone/volto/actions';
import { getBaseUrl } from '@plone/volto/helpers';
import { Container, Button, Form, Loader } from 'semantic-ui-react';
import { subscribeNewsletter, unsubscribeNewsletter } from '../../actions';

const messages = defineMessages({
  Newsletter: {
    id: 'UserProfile',
    defaultMessage: 'Subscribe to the Newsletter',
  },
  emailTitle: {
    id: 'E-mail',
    defaultMessage: 'E-mail',
  },
  emailDescription: {
    id: 'We will use this address to send you the newsletter',
    defaultMessage: 'We will use this address to send you the newsletter',
  },
  saved: {
    id: 'Changes saved',
    defaultMessage: 'Confirmation email sent',
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
class CLMSNewsletterView extends Component {
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
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    this.props.getUser(this.props.userId);
    this.setState({
      value: undefined,
    });
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.state.value) {
      this.props
        .subscribeNewsletter(this.state.value)
        .then(() => {
          this.props.subscribe_loaded &&
            toast.success(
              <Toast
                success
                title={this.props.intl.formatMessage(messages.success)}
                content={this.props.intl.formatMessage(messages.saved)}
              />,
            );
        })
        .catch(() => {
          this.props.subscribe_error &&
            toast.error(
              <Toast
                error
                title={this.props.intl.formatMessage(messages.error)}
                content={this.props.intl.formatMessage(messages.errorMessage)}
              />,
            );
        });
    } else {
      this.emptyFieldErrorToast();
    }
  }

  submitunSubscribeNewsletter = () => {
    if (this.state.value) {
      this.props
        .unsubscribeNewsletter(this.state.value)
        .then(() => {
          this.props.unsubscribe_loaded &&
            toast.success(
              <Toast
                success
                title={this.props.intl.formatMessage(messages.success)}
                content={this.props.intl.formatMessage(messages.saved)}
              />,
            );
        })
        .catch(() => {
          this.props.unsubscribe_error &&
            toast.error(
              <Toast
                error
                title={this.props.intl.formatMessage(messages.error)}
                content={this.props.intl.formatMessage(messages.errorMessage)}
              />,
            );
        });
    } else {
      this.emptyFieldErrorToast();
    }
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
          <Container>
            <h1 className="page-title">
              {this.props.intl.formatMessage(messages.Newsletter)}
            </h1>
            <Form
              className="ccl-form user-form contact-form"
              // onSubmit={this.onSubmit}
              size={'large'}
            >
              <div className="ccl-fieldset">
                <div className="ccl-form-group">
                  <label
                    className="ccl-form-label"
                    htmlFor="contact_form_subject"
                  >
                    {this.props.intl.formatMessage(messages.emailTitle)}
                  </label>
                  <span className="label-required">*</span>
                  <p>
                    {this.props.intl.formatMessage(messages.emailDescription)}
                  </p>
                  <Form.Group inline widths="equal">
                    <Form.Input
                      placeholder="example@example.com"
                      fluid
                      name="email"
                      id="email"
                      required={true}
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                    <Button
                      basic
                      primary
                      value="subscribe"
                      onClick={this.onSubmit}
                    >
                      {!this.props.subscribe_loading ? (
                        <Icon className="circled" name={aheadSVG} size="30px" />
                      ) : (
                        <Loader active inline indeterminate size="small" />
                      )}
                    </Button>
                  </Form.Group>
                  <Button
                    size="mini"
                    color="red"
                    // className="right floated"
                    compact
                    onClick={this.submitunSubscribeNewsletter}
                    // loading={this.props.unsubscribe_loading}
                  >
                    {!this.props.unsubscribe_loading
                      ? 'Unsubscribe'
                      : 'Sending...'}
                  </Button>
                </div>
              </div>
            </Form>
          </Container>
        )}
      </>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state) => ({
      user: state.users.user,
      userId: state.userSession.token
        ? jwtDecode(state.userSession.token).sub
        : '',
      subscribe_loaded: state.subscribe_to_newsletter.subscribe.loaded,
      subscribe_loading: state.subscribe_to_newsletter.subscribe.loading,
      subscribe_error: state.subscribe_to_newsletter.subscribe.error,
      unsubscribe_loaded: state.subscribe_to_newsletter.unsubscribe.loaded,
      unsubscribe_loading: state.subscribe_to_newsletter.unsubscribe.loading,
      unsubscribe_error: state.subscribe_to_newsletter.unsubscribe.error,
    }),
    {
      getUser,
      updateUser,
      getBaseUrl,
      subscribeNewsletter,
      unsubscribeNewsletter,
    },
  ),
)(CLMSNewsletterView);
