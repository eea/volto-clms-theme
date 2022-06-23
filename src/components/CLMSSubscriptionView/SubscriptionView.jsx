/**
 * CLMSSubscriptionView/SubscriptionView container.
 * @module components/CLMSSubscriptionView/SubscriptionView
 */

import { Button, Container, Form, Loader } from 'semantic-ui-react';
import { Icon, NotFound, Toast } from '@plone/volto/components';
import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import {
  getExtraBreadcrumbItems,
  subscribeTo,
  unsubscribeTo,
} from '../../actions';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getSubscriptionConfig } from './subscription_utils';
import { toast } from 'react-toastify';
import validator from 'validator';

const messages = defineMessages({
  subscribeToThe: {
    id: '{subscribe_or_unsubscribe} to receive the {type}',
    defaultMessage: '{subscribe_or_unsubscribe} to receive the {type}',
  },
  emailTitle: {
    id: 'E-mail',
    defaultMessage: 'E-mail',
  },
  emailDescription: {
    id: 'We will use this address to send you the {type}',
    defaultMessage: 'We will use this address to send you the {type}',
  },
  saved: {
    id: 'Changes saved',
    defaultMessage: 'Changes saved!',
  },
  subscriptionSuccessMessage: {
    id:
      'You will receive a confirmation email in {email} to confirm your subscription to receive these messages.',
    defaultMessage:
      'You will receive a confirmation email in {email} to confirm your subscription to receive these messages.',
  },
  unsubscriptionSuccessMessage: {
    id:
      'You will receive confirmation email in {email} to confirm that you want to unsubscribe from receiving these messages',
    defaultMessage:
      'You will receive confirmation email in {email} to confirm that you want to unsubscribe from receiving these messages',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
  errorMessage: {
    id: 'An error has occured. Please try again',
    defaultMessage: 'An error has occured. Please try again',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  invalid_email: {
    id: 'The entered email address is not valid',
    defaultMessage: 'The entered email address is not valid',
  },
  subscribe: {
    id: 'Subscribe',
    defaultMessage: 'Subscribe',
  },
  unsubscribe: {
    id: 'Unsubscribe',
    defaultMessage: 'Unsubscribe',
  },
  write_email_here: {
    id: 'Write your email in the field',
    defaultMessage: 'Write your email in the field',
  },
});

/**
 * SubscriptionView class.
 * @class SubscriptionView
 * @extends Component
 */
class SubscriptionView extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      value: '',
      type_conf: null,
    };
  }

  componentDidMount() {
    const type_conf = getSubscriptionConfig(this.props.type);
    this.setState({ type_conf });
    this.props.getExtraBreadcrumbItems([]);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  emptyFieldErrorToast = () => {
    toast.error(
      <Toast
        error
        title={this.props.intl.formatMessage(messages.error)}
        content={this.props.intl.formatMessage(messages.write_email_here)}
      />,
    );
  };

  invalidEmailErrorToast = () => {
    toast.error(
      <Toast
        error
        title={'Error'}
        content={this.props.intl.formatMessage(messages.invalid_email)}
      />,
    );
  };

  requestErrorToast = () => {
    toast.error(
      <Toast
        error
        title={this.props.intl.formatMessage(messages.error)}
        content={this.props.intl.formatMessage(messages.errorMessage)}
      />,
    );
  };

  requestSuccessToast = () => {
    toast.success(
      <Toast
        success
        title={this.props.intl.formatMessage(messages.success)}
        content={
          <>
            <p>{this.props.intl.formatMessage(messages.saved)}</p>
            <small>
              {this.props.isUnsubscribe
                ? this.props.intl.formatMessage(
                    messages.unsubscriptionSuccessMessage,
                    { email: this.state.value },
                  )
                : this.props.intl.formatMessage(
                    messages.subscriptionSuccessMessage,
                    { email: this.state.value },
                  )}
            </small>
          </>
        }
      />,
    );
  };

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  onSubmit(event) {
    if (this.props.isUnsubscribe) {
      if (this.state.value) {
        this.props
          .unsubscribeTo(this.state.type_conf.back_url, this.state.value)
          .then(() => this.props.loaded && this.requestSuccessToast())
          .catch(() => this.props.error && this.requestErrorToast());
      } else {
        this.emptyFieldErrorToast();
      }
    } else {
      event.preventDefault();
      if (this.state.value) {
        this.props
          .subscribeTo(this.state.type_conf.back_url, this.state.value)
          .then(() => this.props.loaded && this.requestSuccessToast())
          .catch(() => this.props.error && this.requestErrorToast());
      } else {
        this.emptyFieldErrorToast();
      }
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <>
        {this.state.type_conf ? (
          <Container>
            <h1 className="page-title">
              {this.props.intl.formatMessage(messages.subscribeToThe, {
                type: this.props.type,
                subscribe_or_unsubscribe: this.props.isUnsubscribe
                  ? this.props.intl.formatMessage(messages.unsubscribe)
                  : this.props.intl.formatMessage(messages.subscribe),
              })}
            </h1>
            <Form
              className="ccl-form user-form contact-form"
              size={'large'}
              onSubmit={
                validator.isEmail(this.state.value)
                  ? this.onSubmit
                  : this.invalidEmailErrorToast
              }
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
                    {this.props.intl.formatMessage(messages.emailDescription, {
                      type: this.props.type,
                    })}
                  </p>
                  <Form.Group inline widths="equal">
                    <Form.Input
                      maxLength={8000}
                      placeholder="example@example.com"
                      fluid
                      name="email"
                      id="email"
                      // required={true}
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                    <Button basic primary value="subscribe">
                      {!this.props.loading ? (
                        <Icon className="circled" name={aheadSVG} size="30px" />
                      ) : (
                        <Loader active inline indeterminate size="small" />
                      )}
                    </Button>
                  </Form.Group>
                </div>
              </div>
            </Form>
            {!this.props.isUnsubscribe && (
              <>
                <Link
                  to={{
                    pathname: `/${this.props.intl.locale}/unsubscribe/${this.props.type}`,
                  }}
                >
                  UNSUBSCRIBE
                </Link>
              </>
            )}
          </Container>
        ) : (
          <NotFound />
        )}
      </>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      loaded: state.subscription.loaded,
      loading: state.subscription.loading,
      error: state.subscription.error,
      error_message: state.subscription.error_message,
      type: props?.type || props.match.params.type || '',
      isUnsubscribe:
        props?.unsubscribe || props?.route?.extraParams?.unsubscribe || false,
    }),
    { subscribeTo, unsubscribeTo, getExtraBreadcrumbItems },
  ),
)(SubscriptionView);
