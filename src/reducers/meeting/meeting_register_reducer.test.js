import { POST_MEETING_REGISTER } from '../../actions';
import { meetingRegisterReducer } from './meeting_register_reducer';

//jest test to meetingRegisterReducer
describe('meetingRegisterReducer', () => {
  it('should return the initial state', () => {
    expect(meetingRegisterReducer(undefined)).toEqual({
      error: null,
      loaded: false,
      loading: false,
      logged_user_registration: false,
      registered_message: '',
    });
  });
  //jest test to POST_MEETING_REGISTER_SUCCESS
  /* it('should handle POST_MEETING_REGISTER_SUCCESS', () => {
    const action = {
      result: { email: true, subject: '', body: '' },
    };
    expect(
      meetingRegisterReducer(
        {
          error: null,
          loaded: false,
          loading: false,
          logged_user_registration: false,
          registered_message: action.result.registered_message,
        },
        {
          type: `${POST_MEETING_REGISTER}_SUCCESS`,
          logged_user_registration: true,
          registered_message: '',
        },
      ),
    ).toEqual({
      error: null,
      loaded: true,
      loading: false,
      logged_user_registration: true,
      registered_message: action.result.registered_message,
    });
  }); */
  //jest test to meetingRegisterReducer -fail
  it('should handle POST_MEETING_REGISTER_FAIL', () => {
    const action = {
      type: `${POST_MEETING_REGISTER}_FAIL`,
      error: true,
      loaded: false,
      loading: false,
      result: {
        message: '',
      },
    };
    expect(meetingRegisterReducer({}, action)).toEqual({
      error: true,
      loaded: false,
      loading: false,
      registered_message: action.result?.message || action.error?.message,
      logged_user_registration: false,
    });
  });
  //jest test to meetingRegisterReducer -pending
  it('should handle POST_MEETING_REGISTER_PENDING', () => {
    expect(
      meetingRegisterReducer(
        {},
        {
          type: `${POST_MEETING_REGISTER}_PENDING`,
          error: null,
          loaded: false,
          loading: true,
          logged_user_registration: false,
        },
      ),
    ).toEqual({
      error: null,
      loaded: false,
      loading: true,
      logged_user_registration: false,
    });
  });
});
