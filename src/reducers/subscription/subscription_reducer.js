import {
  POST_SUBSCRIBE_TO,
  // POST_UNSUBSCRIBE_TO,
  // POST_CONFIRM_SUBSCRIBE_TO,
} from '../../actions';

const getInitialState = {
  error: null,
  loaded: false,
  loading: false,
  error_message: '',
};

export const subscribeToReducer = (state = getInitialState, action = {}) => {
  switch (action.type) {
    case `${POST_SUBSCRIBE_TO}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${POST_SUBSCRIBE_TO}_FAIL`:
      return {
        ...state,
        error: true,
        loaded: false,
        loading: false,
        error_message:
          action.error?.response?.body?.message ||
          action.error?.response?.body?.error ||
          '',
      };
    case `${POST_SUBSCRIBE_TO}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
      };
    default:
      return state;
  }
};
