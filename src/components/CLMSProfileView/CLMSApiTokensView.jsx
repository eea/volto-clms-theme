/**
 * CLMSProfileView container.
 * @module components/CLMSProfileView/CLMSProfileView
 */
import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Container, Segment } from 'semantic-ui-react';

import { getUser, updateUser } from '@plone/volto/actions';
import { getBaseUrl } from '@plone/volto/helpers';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import CclModal from '@eeacms/volto-clms-theme/components/CclModal/CclModal';

import {
  getTokens,
  createTokens,
  deleteTokens,
} from '../../actions/tokens/tokens';
import { slugify } from '../Blocks/utils';

import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import qs from 'query-string';

/**
 * CLMSProfileView class.
 * @class CLMSProfileView
 * @extends Component
 */

const messages = defineMessages({
  ApiTokens: {
    id: 'ApiTokens',
    defaultMessage: 'API tokens',
  },
  title: {
    id: 'title',
    defaultMessage: 'API token management',
  },
  tokenTitleLabel: {
    id: 'tokenTitleLabel',
    defaultMessage: 'Token title',
  },
  description: {
    id: 'descripton',
    defaultMessage:
      'API tokens are used for machine-to-machine communication with the CLMS website API. You need to create a new API token for each application in wich you need to use the CLMS website API. In this screen you can create a new API token, check the list of your tokens and also delete those tokens.',
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
    defaultMessage: 'The token has been created successfuly',
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
    newTokens: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        client_id: PropTypes.string,
        ip_range: PropTypes.string,
        issued: PropTypes.string,
        key_id: PropTypes.string,
        public_key: PropTypes.string,
        private_key: PropTypes.string,
      }),
    ),
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.deleteToken = this.deleteToken.bind(this);
    this.state = {
      tokenTitle: '',
      canCreateNewToken: true,
      modal: false,
      createdToken: false,
      textToCopy: '',
      openState: false,
    };
  }
  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    tokensDeleteState: {
      items: [],
      loaded: false,
      loading: false,
      error: false,
    },
    tokensGetState: { items: [], loaded: false, loading: false, error: false },
    tokensCreateState: {
      items: [],
      loaded: false,
      loading: false,
      error: false,
    },
    newTokens: [],
  };

  deleteToken(key_id) {
    this.props.deleteTokens(key_id);
    // this.props.getTokens();
    this.setState({ openState: false });
    // this.componentDidMount();
  }

  onClose() {
    this.props.getTokens();
    this.setState({
      canCreateNewToken: false,
      tokenTitle: '',
      createdToken: true,
      textToCopy: '',
      key_id: '',
      value: '',
    });
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      tokenTitle: event.target.value,
      textToCopy: event.target.value,
    });
  }

  handlePost(tokenTitle) {
    this.props.createTokens(tokenTitle);
    this.setState({
      createdToken: true,
      key_id: '',
    });
    this.props.getTokens();
  }

  componentDidMount() {
    this.props.getUser(this.props.userId);
    this.props.getTokens();
    this.setState({
      tokenTitle: '',
      canCreateNewToken: true,
      createdToken: false,
      textToCopy: '',
      key_id: '',
      value: '',
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.tokensDeleteState.loading &&
      nextProps.tokensDeleteState.loaded
    ) {
      this.props.getTokens();
    }
    // if (this.props !== nextProps) {
    //   this.setState(nextProps);
    // }
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
              <h2>{this.props.intl.formatMessage(messages.title)}</h2>
              <p>{this.props.intl.formatMessage(messages.description)}</p>
              {(this.props.tokensGetState.items.length > 0 ||
                this.props.tokensGetState.loading) && (
                <Segment basic loading={this.props.tokensGetState.loading}>
                  {this.props.tokensGetState.loaded &&
                    this.props.tokensGetState.items.length > 0 &&
                    this.props.tokensGetState.items?.map((item, key) => (
                      <Segment key={key}>
                        <p>
                          <strong>Token title: </strong>
                          {item.title}
                        </p>
                        <p>
                          <strong>Token id: </strong>
                          {item.key_id}
                        </p>
                        <CclModal
                          id={key}
                          trigger={
                            <CclButton
                              key={key}
                              mode={'filled'}
                              to={`profile#${slugify(
                                this.props.intl.formatMessage(
                                  messages.ApiTokens,
                                ),
                              )}`}
                            >
                              {this.props.intl.formatMessage(
                                messages.deleteButton,
                              )}
                            </CclButton>
                          }
                          size="tiny"
                        >
                          <Segment
                            basic
                            loading={this.props.tokensDeleteState.loading}
                          >
                            <h4>This token will be deleted forever</h4>
                            <p>
                              You will not be able to use this token again. Only
                              delete your tokens when you are absolutely sure of
                              it
                            </p>
                            <CclButton
                              mode={'filled'}
                              to={`profile#${slugify(
                                this.props.intl.formatMessage(
                                  messages.ApiTokens,
                                ),
                              )}`}
                              onClick={() => {
                                this.deleteToken(item.key_id);
                              }}
                            >
                              {'I confirm that I want to delete this token'}
                            </CclButton>
                          </Segment>
                        </CclModal>
                      </Segment>
                    ))}
                </Segment>
              )}
              <br />
              <br />
              {/* {this.state.canCreateNewToken === false && (
                <CclButton
                  mode={'filled'}
                  onClick={() => {
                    this.handleClick();
                  }}
                  to={`profile#${slugify(
                    this.props.intl.formatMessage(messages.ApiTokens),
                  )}`}
                >
                  {this.props.intl.formatMessage(messages.createTitle)}
                </CclButton>
              )} */}
              {this.state.canCreateNewToken === true && (
                <CclModal
                  trigger={
                    <CclButton
                      mode={'filled'}
                      to={`profile#${slugify(
                        this.props.intl.formatMessage(messages.ApiTokens),
                      )}`}
                    >
                      {this.props.intl.formatMessage(messages.createTitle)}
                    </CclButton>
                  }
                  onCloseExtra={() =>
                    this.setState({
                      canCreateNewToken: true,
                      createdToken: false,
                      value: '',
                    })
                  }
                  size="large"
                >
                  <Segment basic loading={this.props.tokensCreateState.loading}>
                    {this.state.createdToken === false && (
                      <>
                        <h3>
                          {this.props.intl.formatMessage(messages.createTitle)}
                        </h3>
                        <p>
                          {this.props.intl.formatMessage(
                            messages.createDescription,
                          )}
                        </p>
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
                              <br />
                              <CclButton
                                className="ccl-button ccl-button-green"
                                isButton={true}
                                disabled={this.state.tokenTitle === ''}
                                onClick={() => {
                                  this.handlePost(this.state.tokenTitle);
                                }}
                              >
                                {this.props.intl.formatMessage(
                                  messages.createToken,
                                )}
                              </CclButton>
                            </div>
                          </div>
                        </form>
                      </>
                    )}
                    {this.state.createdToken &&
                      !this.props.tokensCreateState.loading && (
                        <div>
                          <h3>
                            {this.props.intl.formatMessage(
                              messages.createdToken,
                            )}
                          </h3>

                          {this.props.tokensCreateState.items.length > 0 &&
                            this.props.tokensCreateState.items?.map(
                              (item, key) => (
                                <React.Fragment key={key}>
                                  {item?.private_key ? (
                                    <>
                                      <h4>
                                        <strong>Token title: </strong>
                                        {item.title}
                                      </h4>
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
                                      <Segment
                                        style={{ wordWrap: 'break-word' }}
                                        secondary
                                      >
                                        {JSON.stringify(item)}
                                      </Segment>
                                      <br />
                                      <CclButton
                                        mode={'filled'}
                                        to={`profile#${slugify(
                                          this.props.intl.formatMessage(
                                            messages.ApiTokens,
                                          ),
                                        )}`}
                                        onClick={() => {
                                          navigator.clipboard.writeText(
                                            JSON.stringify(item),
                                          );
                                        }}
                                      >
                                        {this.props.intl.formatMessage(
                                          messages.copyButton,
                                        )}
                                      </CclButton>
                                      &nbsp;
                                      <CclButton
                                        mode={'filled'}
                                        onClick={this.onClose}
                                        to={`profile#${slugify(
                                          this.props.intl.formatMessage(
                                            messages.ApiTokens,
                                          ),
                                        )}`}
                                      >
                                        {this.props.intl.formatMessage(
                                          messages.goBackButton,
                                        )}
                                      </CclButton>
                                    </>
                                  ) : (
                                    ''
                                  )}
                                </React.Fragment>
                              ),
                            )}
                        </div>
                      )}
                  </Segment>
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
      newTokens: state.tokens.create.items,
      tokensDeleteState: state.tokens.delete,
      tokensGetState: state.tokens.get,
      tokensCreateState: state.tokens.create,
    }),
    { getUser, updateUser, getBaseUrl, getTokens, createTokens, deleteTokens },
  ),
)(CLMSApiTokensView);
