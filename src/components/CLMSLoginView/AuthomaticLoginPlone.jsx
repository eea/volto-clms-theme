/**
 * Combined Login container - supports both external providers and Plone login.
 * @module components/Login/Login
 */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  Container,
  Button,
  Form,
  Input,
  Segment,
  Grid,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import qs from 'query-string';
import { useCookies } from 'react-cookie';

import { Helmet } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { Icon } from '@plone/volto/components';
import { login, resetLoginRequest } from '@plone/volto/actions';
import { toast } from 'react-toastify';
import { Toast } from '@plone/volto/components';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import './Login.less';

// Import authomatic components and actions
import {
  authomaticRedirect,
  listAuthOptions,
  oidcRedirect,
} from '@plone-collective/volto-authomatic/actions';
import AuthProviders from '@plone-collective/volto-authomatic/components/AuthProviders/AuthProviders';

const messages = defineMessages({
  login: {
    id: 'Log in',
    defaultMessage: 'Log in',
  },
  loginName: {
    id: 'Login Name',
    defaultMessage: 'Login Name',
  },
  Login: {
    id: 'Login',
    defaultMessage: 'Login',
  },
  password: {
    id: 'Password',
    defaultMessage: 'Password',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  loginFailed: {
    id: 'Login Failed',
    defaultMessage: 'Login Failed',
  },
  loginFailedContent: {
    id:
      'Both email address and password are case sensitive, check that caps lock is not enabled.',
    defaultMessage:
      'Both email address and password are case sensitive, check that caps lock is not enabled.',
  },
  register: {
    id: 'Register',
    defaultMessage: 'Register',
  },
  forgotPassword: {
    id: 'box_forgot_password_option',
    defaultMessage: 'Forgot your password?',
  },
  signInWith: {
    id: 'Sign in with EEA Microsoft Entra ID',
    defaultMessage: 'Sign in with EEA Microsoft Entra ID',
  },
  orSignIn: {
    id: 'Or sign in with EEA Entra ID:',
    defaultMessage: 'Or sign in with EEA Entra ID:',
  },
  loading: {
    id: 'Loading',
    defaultMessage: 'Loading',
  },
});

/**
 * Get return url function.
 * @function getReturnUrl
 * @param  {Object} location Location object.
 * @returns {string} Return url.
 */
function getReturnUrl(location) {
  return `${
    qs.parse(location.search).return_url ||
    (location.pathname === '/login'
      ? '/'
      : location.pathname.replace('/login', ''))
  }`;
}

/**
 * Combined Login function.
 * @function Login
 * @returns {JSX.Element} Markup of the Login page.
 */
function Login({ intl }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  // Authomatic state
  const [startedOAuth, setStartedOAuth] = useState(false);
  const [startedOIDC, setStartedOIDC] = useState(false);
  const loading = useSelector((state) => state.authOptions.loading);
  const options = useSelector((state) => state.authOptions.options);
  const loginOAuthValues = useSelector((state) => state.authomaticRedirect);
  const loginOIDCValues = useSelector((state) => state.oidcRedirect);
  const [, setCookie] = useCookies();

  // Plone login state
  const token = useSelector((state) => state.userSession.token, shallowEqual);
  const error = useSelector((state) => state.userSession.login.error);
  const ploneLoading = useSelector((state) => state.userSession.login.loading);

  const returnUrl =
    qs.parse(location.search).return_url ||
    location.pathname.replace(/\/login\/?$/, '').replace(/\/logout\/?$/, '') ||
    '/';

  useEffect(() => {
    dispatch(listAuthOptions());
  }, [dispatch]);

  // Handle successful Plone login
  useEffect(() => {
    if (token) {
      history.push(returnUrl || '/');
      if (toast.isActive('loggedOut')) {
        toast.dismiss('loggedOut');
      }
      if (toast.isActive('loginFailed')) {
        toast.dismiss('loginFailed');
      }
    }
    if (error) {
      if (toast.isActive('loggedOut')) {
        toast.dismiss('loggedOut');
      }
      if (!toast.isActive('loginFailed')) {
        toast.error(
          <Toast
            error
            title={intl.formatMessage(messages.loginFailed)}
            content={intl.formatMessage(messages.loginFailedContent)}
          />,
          { autoClose: false, toastId: 'loginFailed' },
        );
      }
    }
    return () => {
      if (toast.isActive('loginFailed')) {
        toast.dismiss('loginFailed');
        dispatch(resetLoginRequest());
      }
    };
  }, [dispatch, token, error, intl, history, returnUrl]);

  // Handle OAuth redirects
  useEffect(() => {
    const next_url = loginOAuthValues.next_url;
    const session = loginOAuthValues.session;
    if (next_url && session && startedOAuth) {
      setStartedOAuth(false);
      // Give time to save state to localstorage
      setTimeout(function () {
        window.location.href = next_url;
      }, 500);
    }
  }, [startedOAuth, loginOAuthValues]);

  useEffect(() => {
    const next_url = loginOIDCValues.next_url;
    if (next_url && startedOIDC) {
      setStartedOIDC(false);
      // Give time to save state to localstorage
      setTimeout(function () {
        window.location.href = next_url;
      }, 500);
    }
  }, [startedOIDC, loginOIDCValues]);

  useEffect(() => {
    if (
      options !== undefined &&
      options.length === 1 &&
      options[0].id === 'oidc'
    ) {
      setStartedOIDC(true);
      dispatch(oidcRedirect('oidc'));
    }
  }, [options, dispatch]);

  // Handle provider selection
  const onSelectProvider = (provider) => {
    setStartedOAuth(true);
    setCookie('return_url', getReturnUrl(location), { path: '/' });
    dispatch(authomaticRedirect(provider.id));
  };

  // Handle Plone login form submission
  const onLogin = (event) => {
    dispatch(
      login(
        document.getElementsByName('login')[0].value,
        document.getElementsByName('password')[0].value,
      ),
    );
    event.preventDefault();
  };

  // Prepare providers for external login
  const validProviders = options
    ? options.filter((provider) => provider.id !== 'oidc')
    : [];

  return (
    <div id="page-login">
      <Helmet title={intl.formatMessage(messages.Login)} />
      <Container text>
        <Segment.Group raised>
          <Segment className="primary">
            <FormattedMessage id="Log In" defaultMessage="Login" />
          </Segment>
          <Segment secondary>
            <FormattedMessage
              id="Sign in to start session"
              defaultMessage="Sign in to start session"
            />
          </Segment>

          {/* Plone Login Form */}
          <Segment className="form">
            <Form method="post" onSubmit={onLogin}>
              <Form.Field inline className="help">
                <Grid>
                  <Grid.Row stretched>
                    <Grid.Column width="4">
                      <div className="wrapper">
                        <label htmlFor="login">
                          <FormattedMessage
                            id="Login Name"
                            defaultMessage="Login Name"
                          />
                        </label>
                      </div>
                    </Grid.Column>
                    <Grid.Column width="8">
                      <Input
                        id="login"
                        name="login"
                        placeholder={intl.formatMessage(messages.loginName)}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Field>
              <Form.Field inline className="help">
                <Grid>
                  <Grid.Row stretched>
                    <Grid.Column stretched width="4">
                      <div className="wrapper">
                        <label htmlFor="password">
                          <FormattedMessage
                            id="Password"
                            defaultMessage="Password"
                          />
                        </label>
                      </div>
                    </Grid.Column>
                    <Grid.Column stretched width="8">
                      <Input
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        name="password"
                        placeholder={intl.formatMessage(messages.password)}
                        tabIndex={0}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Field>
              <Form.Field inline className="help">
                <Grid>
                  <Grid.Row stretched>
                    {config.settings.showSelfRegistration && (
                      <Grid.Column stretched width="12">
                        <p className="help">
                          <Link to="/register">
                            {intl.formatMessage(messages.register)}
                          </Link>
                        </p>
                      </Grid.Column>
                    )}
                    <Grid.Column stretched width="12">
                      <p className="help">
                        <Link to="/passwordreset">
                          {intl.formatMessage(messages.forgotPassword)}
                        </Link>
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Field>
            </Form>
          </Segment>

          <Segment className="actions" clearing>
            <Button
              basic
              primary
              icon
              floated="right"
              type="submit"
              form="login-form"
              id="login-form-submit"
              aria-label={intl.formatMessage(messages.login)}
              title={intl.formatMessage(messages.login)}
              loading={ploneLoading}
              onClick={onLogin}
            >
              <Icon className="circled" name={aheadSVG} size="30px" />
            </Button>

            <Button
              basic
              secondary
              icon
              floated="right"
              id="login-form-cancel"
              as={Link}
              to="/"
              aria-label={intl.formatMessage(messages.cancel)}
              title={intl.formatMessage(messages.cancel)}
            >
              <Icon className="circled" name={clearSVG} size="30px" />
            </Button>
          </Segment>
        </Segment.Group>

        {/* External Login Providers - Outside the main form */}
        {validProviders && validProviders.length > 0 && (
          <div style={{ marginTop: '2rem', width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <FormattedMessage
                id="Or sign in with EEA Entra ID:"
                defaultMessage="Or sign in with EEA Entra ID:"
              />
            </div>
            <div style={{ width: '100%' }}>
              {!loading && validProviders && (
                <AuthProviders
                  providers={validProviders}
                  action="login"
                  onSelectProvider={onSelectProvider}
                />
              )}
              {(loading || validProviders.length === 0) && (
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                  {intl.formatMessage(messages.loading)}
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default injectIntl(Login);
