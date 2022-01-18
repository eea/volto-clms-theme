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
import { subscribeToEvent } from '../../actions';
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
  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  onSubmit(event) {
    event.preventDefault();

    this.props.subscribeToEvent(this.state.value);
    this.props.loaded &&
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
                {this.props.intl.formatMessage(messages.subscribeToTheEvents)}
              </h1>
              <div>
                <Form
                  loading={this.props.loading || false}
                  className="ccl-form user-form contact-form"
                  onSubmit={this.onSubmit}
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
                        {this.props.intl.formatMessage(
                          messages.emailDescription,
                        )}
                      </p>
                      <input
                        value={this.state.value}
                        onChange={this.handleChange}
                        type="text"
                        className="ccl-email-input"
                        id="email"
                        name="email"
                        placeholder="example@example.com"
                        aria-label="Name of the new token"
                        required="required"
                      />
                      {!this.props.loading ? (
                        <Button
                          basic
                          primary
                          floated="right"
                          type="submit"
                          aria-label={'submit'}
                          title={'submit'}
                        >
                          <Icon
                            className="circled"
                            name={aheadSVG}
                            size="30px"
                          />
                        </Button>
                      ) : (
                        <Loader active inline indeterminate size="small" />
                      )}
                    </div>
                  </div>
                </Form>
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
      loaded: state.subscribe_to_event.loaded,
      loading: state.subscribe_to_event.loading,
    }),
    { getUser, updateUser, getBaseUrl, subscribeToEvent },
  ),
)(CLMSEventsView);
