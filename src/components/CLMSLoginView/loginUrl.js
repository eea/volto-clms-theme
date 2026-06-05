import qs from 'query-string';

export function getReturnUrl(location) {
  return (
    qs.parse(location.search || '').return_url ||
    (location.pathname || '/').replace(/\/(?:login|login-plone)\/?$/, '') ||
    '/'
  );
}
