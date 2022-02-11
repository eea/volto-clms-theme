import { userschemaReducer } from './userschema';
import { GET_USERSCHEMA } from '../../constants/ActionTypes';

//jest test to userschemaReducer
describe('userschemaReducer', () => {
  it('should return the initial state', () => {
    expect(userschemaReducer(undefined)).toEqual({
      error: null,
      loaded: false,
      loading: false,
      userschema: {
        fieldsets: [],
        properties: {},
        required: [],
        type: undefined,
      },
    });
  });
  //jest test to userschemaReducer -pending
  it('should handle GET_USERSCHEMA_PENDING', () => {
    const action = {
      type: `${GET_USERSCHEMA}_PENDING`,
      error: null,
      loaded: false,
      loading: true,
    };
    expect(userschemaReducer({}, action)).toEqual({
      error: null,
      loaded: false,
      loading: true,
    });
  });
  //jest test to userschemaReducer -fail
  it('should handle GET_USERSCHEMA_FAIL', () => {
    const action = {
      type: `${GET_USERSCHEMA}_FAIL`,
      error: 'error',
    };
    expect(userschemaReducer({}, action)).toEqual({
      error: action.error,
      loaded: false,
      loading: false,
    });
  });
  //jest test to userschemaReducer -success
  it('should handle GET_USERSCHEMA_SUCCESS', () => {
    const action = {
      type: `${GET_USERSCHEMA}_SUCCESS`,
      result: {
        fieldsets: [],
        properties: {},
        required: [],
        type: undefined,
      },
    };
    expect(userschemaReducer({}, action)).toEqual({
      error: null,
      loaded: true,
      loading: false,
      userschema: action.result,
    });
  });
});
