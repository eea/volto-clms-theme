/**
 * CLMSProfileView container.
 * @module components/CLMSProfileView/CLMSProfileView
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'query-string';
import { compose } from 'redux';
import { defineMessages, injectIntl } from 'react-intl';
import jwtDecode from 'jwt-decode';
import { Toast } from '@plone/volto/components';
import { toast } from 'react-toastify';
import { getUser, updateUser } from '@plone/volto/actions';
import { getBaseUrl } from '@plone/volto/helpers';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { Container } from 'semantic-ui-react';
import CclModal from '@eeacms/volto-clms-theme/components/CclModal/CclModal';

const messages = defineMessages({
  ApiTokens: {
    id: 'ApiTokens',
    defaultMessage: 'API Tokens',
  },
  title: {
    id: 'title',
    defaultMessage: 'API Token management',
  },
  description: {
    id: 'descripton',
    defaultMessage:
      'API tokens are used for machine-to-machine communication with the CLMS portal API. You need to create a new API token for each application in wich you need to use the CLMS portal API. In this screen you can create a new API token, check the list of your tokens and also delete those tokens.',
  },
  createTitle: {
    id: 'create title',
    defaultMessage: 'CREATE NEW TOKEN',
  },
  createDescription: {
    id: 'Create token description',
    defaultMessage:
      'Use this form to create a new token and name it in a way that you can recognize it.',
  },
  createName: {
    id: 'Create token name',
    defaultMessage: 'Name',
  },
  createToken: {
    id: 'Create token',
    defaultMessage: 'Create',
  },
  createdTitle: {
    id: 'created title',
    defaultMessage: 'NEW TOKEN CREATED',
  },
  createdDescription: {
    id: 'Created token description',
    defaultMessage:
      'This is your new token. Please note its value, because it will only be shown one. If you lose access to this token, you will need to delete it and create a new one',
  },
  createdToken: {
    id: 'Created token name',
    defaultMessage: 'Token',
  },
  copyButton: {
    id: 'Copy created token button',
    defaultMessage: 'Copy to clipboard',
  },
  goBackButton: {
    id: 'Go back button',
    defaultMessage: 'Go back to the token list',
  },
  existingTokens: {
    id: 'existing tokens',
    defaultMessage: 'Existing tokens',
  },
  existingTokensDescription: {
    id: 'existing tokens description',
    defaultMessage: 'These are your avaliable tokens',
  },
});

/**
 * CLMSProfileView class.
 * @class CLMSProfileView
 * @extends Component
 */
class CLMSApiTokensView extends Component {
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
    returnUrl: PropTypes.string,
    pathname: PropTypes.string,
    getUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    getBaseUrl: PropTypes.func.isRequired,
    input: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showCreated = this.showCreated.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state = {
      value: '',
      createNewToken: true,
      modal: false,
      createdToken: false,
      textToCopy: '',
      button: true,
    };
  }

  onClose() {
    this.setState({
      createdToken: false,
      modal: false,
      value: '',
      textToCopy: '',
      createNewToken: false,
    });
  }
  handleChange(event) {
    this.setState({
      value: event.target.value,
      textToCopy: event.target.value,
    });
  }
  handleClick() {
    this.setState({
      createdToken: true,
      modal: false,
      button: false,
      createNewToken: true,
    });
  }
  showCreated() {
    this.setState({
      createdToken: true,
      modal: true,
      button: false,
      createNewToken: true,
    });
  }
  componentDidMount() {
    this.props.getUser(this.props.userId);
  }
  /**
   * Cancel handler
   * @method onCancel
   * @param
   * @returns {undefined}
   */
  onCancel() {
    this.props.history.push(
      this.props.returnUrl || getBaseUrl(this.props.pathname),
    );
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  onSubmit(data) {
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
              {this.props.intl.formatMessage(messages.ApiTokens)}
            </h1>
            <div>
              <h3>{this.props.intl.formatMessage(messages.title)}</h3>
              <p>{this.props.intl.formatMessage(messages.description)}</p>
              {/* Token guztien mapeoa eta bakoitzaren ondoan borratzeko aukera hemen
               ** Back to the token list botoian klikatzean lehen pantailara heldu baina Create new token botoia ikusi behar da*/}
              {this.state.createNewToken === false && (
                <CclButton
                  mode={'filled'}
                  onClick={this.handleClick}
                  {...(this.state.value === '')}
                >
                  {this.props.intl.formatMessage(messages.createTitle)}
                </CclButton>
              )}
              {this.state.createNewToken === true && (
                <CclModal
                  trigger={
                    <CclButton mode={'filled'} {...(this.state.value === '')}>
                      {this.props.intl.formatMessage(messages.createTitle)}
                    </CclButton>
                  }
                  size="fullscreen"
                >
                  <div>
                    <h3>
                      {this.props.intl.formatMessage(messages.createTitle)}
                    </h3>
                    <p>
                      {this.props.intl.formatMessage(
                        messages.createDescription,
                      )}
                    </p>
                    <p> {this.props.intl.formatMessage(messages.createName)}</p>
                    <form
                      className="ccl-form search-form"
                      onSubmit={this.onSubmit}
                    >
                      <input
                        onChange={this.handleChange}
                        type="text"
                        className="ccl-text-input"
                        id="create_new_token"
                        name="createToken"
                        placeholder=""
                        aria-label="Name of the new token"
                      />
                    </form>
                    {(this.state.value !== '' && (
                      <>
                        <CclButton
                          onClick={this.handleClick}
                          mode={'filled'}
                          disabled={
                            this.state.createdToken === true && (false || true)
                          }
                        >
                          {this.props.intl.formatMessage(messages.createToken)}
                        </CclButton>
                        {(this.state.createdToken === true && (
                          <div>
                            <p>
                              {this.props.intl.formatMessage(
                                messages.createdToken,
                              )}
                            </p>
                            <form className="ccl-form search-form">
                              <input
                                onChange={this.handleChange}
                                //texttoCopy pasa ordez sortutako tokena pasa behar zaio
                                value={this.state.textToCopy}
                                type="text"
                                className="ccl-text-input"
                                id="created_token"
                                name="createdToken"
                                placeholder=""
                                aria-label="Created token"
                              />
                            </form>
                            <CclButton
                              mode={'filled'}
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  this.state.textToCopy,
                                );
                              }}
                            >
                              {this.props.intl.formatMessage(
                                messages.copyButton,
                              )}
                            </CclButton>
                            <CclButton mode={'filled'} onClick={this.onClose}>
                              {this.props.intl.formatMessage(
                                messages.goBackButton,
                              )}
                            </CclButton>
                          </div>
                        )) ||
                          ''}
                      </>
                    )) || (
                      <CclButton mode={'filled'} disabled={true}>
                        {this.props.intl.formatMessage(messages.createToken)}
                      </CclButton>
                    )}
                  </div>
                </CclModal>
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
      returnUrl: qs.parse(props.location).return_url,
      pathname: props.pathname,
    }),
    { getUser, updateUser, getBaseUrl },
  ),
)(CLMSApiTokensView);
