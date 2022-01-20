/**
 * CLMSSubscriptionView/SubscriptionView container.
 * @module components/CLMSSubscriptionView/SubscriptionView
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { defineMessages, injectIntl } from 'react-intl';
import { Icon, Toast } from '@plone/volto/components';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import { toast } from 'react-toastify';
import { Container, Button, Form } from 'semantic-ui-react';
import { subscribeTo, unsubscribeTo } from '../../actions';
import { Loader } from 'semantic-ui-react';
import { getSubscriptionConfig } from './subscription_utils';
import { Link } from 'react-router-dom';
import { getExtraBreadcrumbItems } from '../../actions';
import { NotFound } from '@plone/volto/components';
const messages = defineMessages({
  subscribeToThe: {
    id: '{subscribe_or_unsubscribe} to the {type}',
    defaultMessage: '{subscribe_or_unsubscribe} to the {type}',
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
    defaultMessage: 'Changes saved',
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
        content={'Write your email in the field'}
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
        content={this.props.intl.formatMessage(messages.saved)}
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
    event.preventDefault();
    if (this.state.value) {
      this.props
        .subscribeTo(this.state.type_conf.back_url, this.state.value)
        .then(() => {
          this.props.loaded && this.requestSuccessToast();
        })
        .catch(() => {
          this.props.error && this.requestErrorToast();
        });
    } else {
      this.emptyFieldErrorToast();
    }
  }

  submitUnsubscribeTo = () => {
    if (this.state.value) {
      this.props
        .unsubscribeTo(this.state.type_conf.back_url, this.state.value)
        .then(() => {
          this.props.loaded && this.requestSuccessToast();
        })
        .catch(() => {
          this.props.error && this.requestErrorToast();
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
    return (
      <>
        {this.state.type_conf ? (
          <Container>
            <h1 className="page-title">
              {this.props.intl.formatMessage(messages.subscribeToThe, {
                type: this.props.type,
                subscribe_or_unsubscribe: this.props.isUnsubscribe
                  ? 'Unsubscribe'
                  : 'Subscribe',
              })}
            </h1>
            <Form
              className="ccl-form user-form contact-form"
              size={'large'}
              onSubmit={
                this.props.isUnsubscribe
                  ? this.submitUnsubscribeTo
                  : this.onSubmit
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
                      placeholder="example@example.com"
                      fluid
                      name="email"
                      id="email"
                      required={true}
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
                    pathname: `/unsubscribe/${this.props.type}`,
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
