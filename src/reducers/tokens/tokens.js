import { map } from 'lodash';

// eslint-disable-next-line import/no-unresolved
import {
  GET_TOKENS,
  CREATE_TOKENS,
  DELETE_TOKENS,
} from '../../constants/ActionTypes';

const initialState = {
  get: {
    error: null,
    items: [],
    loaded: false,
    loading: false,
  },
  create: {
    error: null,
    items: [],
    loaded: false,
    loading: false,
  },
  delete: {
    error: null,
    items: [],
    loaded: false,
    loading: false,
  },
};

/**
 * Tokens reducer.
 * @function tokens
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function tokens(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_TOKENS}_PENDING`:
      return {
        ...state,
        get: {
          ...state.get,
          error: null,
          loaded: false,
          loading: true,
        },
      };
    case `${CREATE_TOKENS}_PENDING`:
      return {
        ...state,
        create: {
          ...state.create,
          error: null,
          loaded: false,
          loading: true,
        },
      };
    case `${DELETE_TOKENS}_PENDING`:
      return {
        ...state,
        delete: {
          ...state.delete,
          error: null,
          loaded: false,
          loading: true,
        },
      };
    case `${GET_TOKENS}_SUCCESS`:
      return {
        ...state,
        get: {
          ...state.get,
          error: null,
          items: map(action.result.items, (item) => ({
            title: item.title,
            key_id: item.key_id,
            client_id: item.client_id,
            ip_range: item.ip_range,
            issued: item.issued,
            last_used: item.last_used,
          })),
          loaded: true,
          loading: false,
        },
      };
    case `${CREATE_TOKENS}_SUCCESS`:
      return {
        ...state,
        create: {
          ...state.create,
          error: null,
          items: map(action.result.items, (item) => ({
            client_id: item.client_id,
            ip_range: item.ip_range,
            issued: item.issued,
            key_id: item.key_id,
            public_key: item.public_key,
            title: item.title,
            token_uri: item.token_uri,
            user_id: item.user_id,
          })),
          loaded: true,
          loading: false,
        },
      };
    case `${DELETE_TOKENS}_SUCCESS`:
      return {
        ...state,
        delete: {
          ...state.delete,
          error: null,
          loaded: true,
          loading: false,
        },
      };
    case `${GET_TOKENS}_FAIL`:
      return {
        ...state,
        get: {
          ...state.get,
          error: action.error,
          tokens: [],
          loaded: false,
          loading: false,
        },
      };
    case `${CREATE_TOKENS}_FAIL`:
      return {
        ...state,
        create: {
          ...state.create,
          error: action.error,
          tokens: [],
          loaded: false,
          loading: false,
        },
      };
    case `${DELETE_TOKENS}_FAIL`:
      return 'cannot get item id';
    default:
      return state;
  }
}
