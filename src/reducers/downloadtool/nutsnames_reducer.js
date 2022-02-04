/**
 * Downloadtool/nutsnames reducer.
 * @module reducers/downloadtool/nutsnames
 */

import { GET_NUTSNAME } from '../../actions';

const getInitialState = {
  error: null,
  loaded: false,
  loading: false,
  nutsnames: {},
};

export const nutsnamesReducer = (state = getInitialState, action = {}) => {
  switch (action?.type) {
    case `${GET_NUTSNAME}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };

    case `${GET_NUTSNAME}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };

    case `${GET_NUTSNAME}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        nutsnames: action.result,
      };

    default:
      return state;
  }
};
