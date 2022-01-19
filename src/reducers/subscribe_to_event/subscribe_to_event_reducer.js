import {
  POST_SUBSCRIBE_TO_EVENT,
  POST_UNSUBSCRIBE_TO_EVENT,
  POST_CONFIRM_SUBSCRIBE_TO_EVENT,
} from '../../actions';

const initialAPIState = {
  error: null,
  loaded: false,
  loading: false,
};

const getInitialState = {
  subscribe: initialAPIState,
  confirm_subscribe: initialAPIState,
  unsubscribe: initialAPIState,
  confirm_unsubscribe: initialAPIState,
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
    case `${POST_CONFIRM_SUBSCRIBE_TO_EVENT}_PENDING`:
      return {
        ...state,
        confirm_subscribe: {
          ...state.confirm_subscribe,
          error: null,
          loaded: false,
          loading: true,
        },
      };
    case `${POST_CONFIRM_SUBSCRIBE_TO_EVENT}_FAIL`:
      console.log('state: ', action);
      return {
        ...state,
        confirm_subscribe: {
          ...state.confirm_subscribe,
          error_message: action.error.response.body.error || '',
          error: true,
          loaded: false,
          loading: false,
        },
      };
    case `${POST_CONFIRM_SUBSCRIBE_TO_EVENT}_SUCCESS`:
      return {
        ...state,
        confirm_subscribe: {
          ...state.confirm_subscribe,
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
