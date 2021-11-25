/**
 * Registry reducer.
 * @module reducers/registry
 */

import { GET_REGISTRY } from '../../actions';

const getInitialState = {
  error: null,
  loaded: false,
  loading: false,
  registry: {},
};

export const registryReducer = (state = getInitialState, action = {}) => {
  console.log('registryReducer', state, action);
  switch (action?.type) {
    case `${GET_REGISTRY}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_REGISTRY}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };

    case `${GET_REGISTRY}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        registry: {
          ...state.registry,
          [action.registry_key]: action.result,
        },
      };
    default:
      return state;
  }
};
