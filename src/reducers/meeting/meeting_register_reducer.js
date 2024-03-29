/**
 * Cart items reducer.
 * @module reducers/cartItemsReducer
 */

import { POST_MEETING_REGISTER } from '../../actions';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  logged_user_registration: false,
  registered_message: '',
};

export const meetingRegisterReducer = (state = initialState, action = {}) => {
  switch (action?.type) {
    case `${POST_MEETING_REGISTER}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
        logged_user_registration: false,
      };
    case `${POST_MEETING_REGISTER}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
        logged_user_registration: false,
        registered_message: action.result?.message || action.error?.message,
      };

    case `${POST_MEETING_REGISTER}_SUCCESS`:
      var resultJSON = JSON.parse(action.result.replace(/'/g, '"'));
      return {
        ...state,
        error: resultJSON.email ? null : true,
        loaded: true,
        loading: false,
        logged_user_registration: true,
        registered_message:
          resultJSON?.message ||
          'You have succesfully registered to this meeting',
        // registered_message: action.result.message,
      };
    default:
      return state;
  }
};
