/**
 * Authomatic login mounted on /login-plone.
 * @module components/CLMSLoginView/AuthomaticLoginPlone
 */
import React, { useEffect, useState } from 'react';
import {
  authomaticRedirect,
  listAuthOptions,
  oidcRedirect,
} from '@plone-collective/volto-authomatic/src/actions';
import LoginForm from '@plone-collective/volto-authomatic/src/components/Login/LoginForm';
import { injectIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import { useCookies } from 'react-cookie';

function getReturnUrl(location) {
  const returnUrl = qs.parse(location.search).return_url;

  if (returnUrl) {
    return returnUrl;
  }

  const pathname = location.pathname || '/';
  const loginPloneSuffix = '/login-plone';
  const loginSuffix = '/login';

  if (pathname === loginPloneSuffix || pathname === loginSuffix) {
    return '/';
  }

  if (pathname.endsWith(loginPloneSuffix)) {
    return pathname.slice(0, -loginPloneSuffix.length) || '/';
  }

  if (pathname.endsWith(loginSuffix)) {
    return pathname.slice(0, -loginSuffix.length) || '/';
  }

  return '/';
}

function AuthomaticLoginPlone() {
  const dispatch = useDispatch();
  const [startedOAuth, setStartedOAuth] = useState(false);
  const [startedOIDC, setStartedOIDC] = useState(false);
  const loading = useSelector((state) => state.authOptions.loading);
  const options = useSelector((state) => state.authOptions.options);
  const loginOAuthValues = useSelector((state) => state.authomaticRedirect);
  const loginOIDCValues = useSelector((state) => state.oidcRedirect);
  const location = useLocation();
  const [, setCookie] = useCookies();

  useEffect(() => {
    dispatch(listAuthOptions());
  }, [dispatch]);

  useEffect(() => {
    const nextUrl = loginOAuthValues.next_url;
    const session = loginOAuthValues.session;

    if (nextUrl && session && startedOAuth) {
      setStartedOAuth(false);
      setTimeout(() => {
        window.location.href = nextUrl;
      }, 500);
    }
  }, [startedOAuth, loginOAuthValues]);

  const onSelectProvider = (provider) => {
    setStartedOAuth(true);
    setCookie('return_url', getReturnUrl(location), { path: '/' });
    dispatch(authomaticRedirect(provider.id));
  };

  useEffect(() => {
    const nextUrl = loginOIDCValues.next_url;

    if (nextUrl && startedOIDC) {
      setStartedOIDC(false);
      setTimeout(() => {
        window.location.href = nextUrl;
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

  return (
    <LoginForm
      loading={loading}
      providers={options}
      action="login"
      onSelectProvider={onSelectProvider}
    />
  );
}

export default injectIntl(AuthomaticLoginPlone);
