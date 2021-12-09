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
import { getUser, updateUser } from '@plone/volto/actions';
import { getBaseUrl } from '@plone/volto/helpers';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { Container } from 'semantic-ui-react';
import CclModal from '@eeacms/volto-clms-theme/components/CclModal/CclModal';
import {
  getTokens,
  createTokens,
  deleteTokens,
} from '../../actions/tokens/tokens';

const messages = defineMessages({
  ApiTokens: {
    id: 'ApiTokens',
    defaultMessage: 'API Tokens',
  },
  title: {
    id: 'title',
    defaultMessage: 'API Token management',
  },
  tokenTitleLabel: {
    id: 'tokenTitleLabel',
    defaultMessage: 'Token title',
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
  deleteButton: {
    id: 'Delete the token',
    defaultMessage: 'Delete',
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
    getTokens: PropTypes.func.isRequired,
    createTokens: PropTypes.func,
    deleteTokens: PropTypes.func,
    updateUser: PropTypes.func.isRequired,
    getBaseUrl: PropTypes.func.isRequired,
    input: PropTypes.string,
    createdTokens: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        client_id: PropTypes.string,
        ip_range: PropTypes.string,
        issued: PropTypes.string,
        key_id: PropTypes.string,
        last_used: PropTypes.string,
        title: PropTypes.string,
      }),
    ),
    newTokens: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        client_id: PropTypes.string,
        ip_range: PropTypes.string,
        issued: PropTypes.string,
        key_id: PropTypes.string,
        last_used: PropTypes.string,
        title: PropTypes.string,
      }),
    ),
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.deleteToken = this.deleteToken.bind(this);
    this.state = {
      tokenTitle: '',
      createNewToken: true,
      modal: false,
      createdToken: false,
      textToCopy: '',
      key_id: '',
    };
  }
  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    createdTokens: [],
    newTokens: [],
  };

  deleteToken(key_id) {
    this.props.deleteTokens(key_id);
    this.props.getTokens();
  }

  onClose() {
    this.componentDidMount();
    this.setState({
      createNewToken: false,
      public_key: undefined,
    });
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      tokenTitle: event.target.value,
      textToCopy: event.target.value,
    });
  }

  handleClick() {
    this.setState({
      modal: false,
      createNewToken: true,
      public_key: undefined,
    });
  }

  handlePost(tokenTitle) {
    this.setState({
      createdToken: true,
      modal: false,
      button: false,
      key_id: '',
    });
    this.props.createTokens(tokenTitle);
    this.props.getTokens();
  }

  componentDidMount() {
    this.props.getUser(this.props.userId);
    this.props.getTokens();
    this.setState({
      value: undefined,
      tokenTitle: undefined,
      button: false,
      // createNewToken: true,
      modal: false,
      createdToken: false,
      textToCopy: undefined,
      key_id: undefined,
    });
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
              {this.props.createdTokens?.map((item) => (
                <>
                  <div>
                    <p>{item.title}</p>
                    <p>{item.key_id}</p>
                    <CclModal
                      onClick={() => this.onClose}
                      trigger={
                        <CclButton mode={'filled'}>
                          {this.props.intl.formatMessage(messages.deleteButton)}
                        </CclButton>
                      }
                      size="small"
                    >
                      <h4>This token will be deleted forever</h4>
                      <CclButton
                        mode={'filled'}
                        onClick={() => {
                          this.deleteToken(item.key_id);
                        }}
                      >
                        {'Confirm Delete'}
                      </CclButton>
                    </CclModal>
                  </div>
                </>
              ))}
              <br></br>
              <br></br>
              {this.state.createNewToken === false && (
                <CclButton mode={'filled'} onClick={this.handleClick}>
                  {this.props.intl.formatMessage(messages.createTitle)}
                </CclButton>
              )}
              {this.state.createNewToken === true && (
                <CclModal
                  onClick={() => this.onClose}
                  trigger={
                    <CclButton mode={'filled'}>
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
                    <form className="ccl-form user-form contact-form">
                      <div className="ccl-fieldset">
                        <div className="ccl-form-group">
                          <label
                            className="ccl-form-label"
                            htmlFor="contact_form_subject"
                          >
                            {this.props.intl.formatMessage(
                              messages.tokenTitleLabel,
                            )}
                          </label>
                          <span className="label-required">*</span>
                          <input
                            value={this.state.value}
                            onChange={this.handleChange}
                            type="text"
                            className="ccl-text-input"
                            id="create_new_token"
                            name="createToken"
                            placeholder=""
                            aria-label="Name of the new token"
                          />
                          <input
                            className="ccl-button ccl-button-green"
                            type="button"
                            disabled={
                              this.state.createdToken === true ||
                              this.state.tokenTitle === ''
                            }
                            value={this.props.intl.formatMessage(
                              messages.createToken,
                            )}
                            onClick={() => {
                              this.handlePost(this.state.tokenTitle);
                            }}
                          />
                        </div>
                      </div>
                    </form>
                    {this.state.tokenTitle !== '' && (
                      <>
                        {(this.state.createdToken === true && (
                          <div>
                            <p>
                              {this.props.intl.formatMessage(
                                messages.createdToken,
                              )}
                            </p>
                            <form className="ccl-form search-form">
                              {this.props.newTokens?.map((item) => (
                                <>
                                  {(item.public_key !== undefined && (
                                    <>
                                      <p>{'Download your service key.'}</p>
                                      <p>
                                        {
                                          "This is the only time your private key will be displayed - it will not be stored on the server, and can't be recovered should you fail to save it."
                                        }
                                      </p>
                                      <p>
                                        {
                                          'You should copy & paste this key into a .json file, and store this file in a location accessible only to your service application. This key grants anyone in possession of it full access to this account. You should therefore make sure to protect it with the least file system permissions possible.'
                                        }
                                      </p>
                                      <input
                                        value={JSON.stringify(item)}
                                        disabled="disabled"
                                        type="text"
                                        className="ccl-text-input"
                                        id="created_token"
                                        name="createdToken"
                                        placeholder=""
                                        aria-label="Created token"
                                      />
                                      <CclButton
                                        mode={'filled'}
                                        onClick={() => {
                                          navigator.clipboard.writeText(
                                            item.public_key,
                                          );
                                        }}
                                      >
                                        {this.props.intl.formatMessage(
                                          messages.copyButton,
                                        )}
                                      </CclButton>
                                    </>
                                  )) ||
                                    ''}
                                </>
                              ))}
                            </form>
                            <CclButton mode={'filled'} onClick={this.onClose}>
                              {this.props.intl.formatMessage(
                                messages.goBackButton,
                              )}
                            </CclButton>
                          </div>
                        )) ||
                          ''}
                      </>
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
      createdTokens: state.tokens.get.items,
      newTokens: state.tokens.create.items,
    }),
    { getUser, updateUser, getBaseUrl, getTokens, createTokens, deleteTokens },
  ),
)(CLMSApiTokensView);
