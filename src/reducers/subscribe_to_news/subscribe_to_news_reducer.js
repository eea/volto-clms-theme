import {
  POST_SUBSCRIBE_TO_NEWS,
  POST_UNSUBSCRIBE_TO_NEWS,
} from '../../actions';

const getInitialState = {
  subscribe: {
    error: null,
    loaded: false,
    loading: false,
  },
  unsubscribe: {
    error: null,
    loaded: false,
    loading: false,
  },
};

export const subscribeToNewsReducer = (
  state = getInitialState,
  action = {},
) => {
  switch (action.type) {
    case `${POST_SUBSCRIBE_TO_NEWS}_PENDING`:
      return {
        ...state,
        subscribe: {
          ...state.subscribe,
          error: null,
          loaded: false,
          loading: true,
        },
      };
    case `${POST_SUBSCRIBE_TO_NEWS}_FAIL`:
      return {
        ...state,
        subscribe: {
          ...state.subscribe,
          error: true,
          loaded: false,
          loading: false,
        },
      };
    case `${POST_SUBSCRIBE_TO_NEWS}_SUCCESS`:
      return {
        ...state,
        subscribe: {
          ...state.subscribe,
          error: null,
          loaded: true,
          loading: false,
        },
      };

    case `${POST_UNSUBSCRIBE_TO_NEWS}_PENDING`:
      return {
        ...state,
        unsubscribe: {
          ...state.unsubscribe,
          error: null,
          loaded: false,
          loading: true,
        },
      };
    case `${POST_UNSUBSCRIBE_TO_NEWS}_FAIL`:
      return {
        ...state,
        unsubscribe: {
          ...state.unsubscribe,
          error: true,
          loaded: false,
          loading: false,
        },
      };
    case `${POST_UNSUBSCRIBE_TO_NEWS}_SUCCESS`:
      return {
        ...state,
        unsubscribe: {
          ...state.unsubscribe,
          error: null,
          loaded: true,
          loading: false,
        },
      };
    default:
      return state;
  }
};
