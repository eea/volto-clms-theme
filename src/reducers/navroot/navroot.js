/**
 * Toolbar reducer.
 * @module reducers/toolbar/toolbar
 */

import { GET_NAVROOT } from '@eeacms/volto-clms-theme/actions/navroot/navroot';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  data: {},
};

/**
 * navroot reducer.
 * @function navroot
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function navroot(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_NAVROOT}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
        data: {},
      };
    case `${GET_NAVROOT}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        data: action.result,
      };
    case `${GET_NAVROOT}_FAIL`:
      return {
        ...state,
        error: action.result,
        loaded: false,
        loading: false,
        data: {},
      };
    default:
      return state;
  }
}
