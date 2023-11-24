import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';
import { logout, purgeMessages } from '@plone/volto/actions';

const Logout = ({ location }) => {
  const token = useSelector((state) => state.userSession.token, shallowEqual);
  const history = useHistory();
  const dispatch = useDispatch();

  const returnUrl = useMemo(
    () =>
      qs.parse(location.search).return_url ||
      location.pathname
        .replace(/\/login\/?$/, '')
        .replace(/\/logout\/?$/, '') ||
      '/',
    [location],
  );

  useEffect(() => {
    dispatch(logout());
    dispatch(purgeMessages());
  }, [dispatch]);

  useEffect(() => {
    if (!token) {
      window.location.href = '/';
    }
  }, [history, returnUrl, token]);

  return '';
};

export default Logout;
