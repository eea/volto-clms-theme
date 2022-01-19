import {
  POST_SUBSCRIBE_TO_EVENT,
  POST_UNSUBSCRIBE_TO_EVENT,
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

export const subscribeToEventReducer = (
  state = getInitialState,
  action = {},
) => {
  switch (action.type) {
    case `${POST_SUBSCRIBE_TO_EVENT}_PENDING`:
      return {
        ...state,
        subscribe: {
          ...state.subscribe,
          error: null,
          loaded: false,
          loading: true,
        },
      };
    case `${POST_SUBSCRIBE_TO_EVENT}_FAIL`:
      return {
        ...state,
        subscribe: {
          ...state.subscribe,
          error: true,
          loaded: false,
          loading: false,
        },
      };
    case `${POST_SUBSCRIBE_TO_EVENT}_SUCCESS`:
      return {
        ...state,
        subscribe: {
          ...state.subscribe,
          error: null,
          loaded: true,
          loading: false,
        },
      };

    case `${POST_UNSUBSCRIBE_TO_EVENT}_PENDING`:
      return {
        ...state,
        unsubscribe: {
          ...state.unsubscribe,
          error: null,
          loaded: false,
          loading: true,
        },
      };
    case `${POST_UNSUBSCRIBE_TO_EVENT}_FAIL`:
      return {
        ...state,
        unsubscribe: {
          ...state.unsubscribe,
          error: true,
          loaded: false,
          loading: false,
        },
      };
    case `${POST_UNSUBSCRIBE_TO_EVENT}_SUCCESS`:
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
