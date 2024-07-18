import { LOGOUT } from '@plone/volto/constants/ActionTypes';
import Cookies from 'universal-cookie';

const initialState = {
  token: null,
  login: {
    loaded: false,
    loading: false,
    error: null,
  },
};

export default function customUserSession(state = initialState, action = {}) {
  switch (action.type) {
    case `${LOGOUT}_SUCCESS`:
      const cookies = new Cookies();
      const allCookies = cookies.getAll();
      Object.keys(allCookies).forEach((name) => {
        if (/__ac/.test(name) || /ZopeId/.test(name)) {
          cookies.remove(name);
        }
      });
      return state;
    default:
      return state;
  }
}
