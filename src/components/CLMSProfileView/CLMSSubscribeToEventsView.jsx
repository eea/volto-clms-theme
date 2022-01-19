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
import { Container, Button, Form } from 'semantic-ui-react';
import { subscribeToEvent, unsubscribeToEvent } from '../../actions';
import { Loader } from 'semantic-ui-react';

const messages = defineMessages({
  subscribeToTheEvents: {
    id: 'Subscribe to the Events',
    defaultMessage: 'Subscribe to the Events',
  },
  emailTitle: {
    id: 'E-mail',
    defaultMessage: 'E-mail',
  },
  emailDescription: {
    id: 'We will use this address to send you the events',
    defaultMessage: 'We will use this address to send you the events',
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
 * CLMSProfileView class.
 * @class CLMSProfileView
 * @extends Component
 */
class CLMSEventsView extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
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
        .subscribeToEvent(this.state.value)
        .then(() => {
          this.props.subscribe_loaded && this.requestSuccessToast();
        })
        .catch(() => {
          this.props.subscribe_error && this.requestErrorToast();
        });
    } else {
      this.emptyFieldErrorToast();
    }
  }

  submitUnsubscribeToEvent = () => {
    if (this.state.value) {
      this.props
        .unsubscribeToEvent(this.state.value)
        .then(() => {
          this.props.unsubscribe_loaded && this.requestSuccessToast();
        })
        .catch(() => {
          this.props.unsubscribe_error && this.requestErrorToast();
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
              {this.props.intl.formatMessage(messages.subscribeToTheEvents)}
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
                    onClick={this.submitUnsubscribeToEvent}
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
    (state, props) => ({
      user: state.users.user,
      userId: state.userSession.token
        ? jwtDecode(state.userSession.token).sub
        : '',
      subscribe_loaded: state.subscribe_to_event.subscribe.loaded,
      subscribe_loading: state.subscribe_to_event.subscribe.loading,
      subscribe_error: state.subscribe_to_event.subscribe.error,
      unsubscribe_loaded: state.subscribe_to_event.unsubscribe.loaded,
      unsubscribe_loading: state.subscribe_to_event.unsubscribe.loading,
      unsubscribe_error: state.subscribe_to_event.unsubscribe.error,
    }),
    { getUser, updateUser, getBaseUrl, subscribeToEvent, unsubscribeToEvent },
  ),
)(CLMSEventsView);
