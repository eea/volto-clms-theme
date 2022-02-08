import { POST_SUBSCRIBE_TO } from '../../actions';
import { subscribeToReducer } from './subscription_reducer';

//jest test for subscribeToReducer
describe('subscribeToReducer', () => {
  it('should return the initial state', () => {
    expect(subscribeToReducer(undefined, {})).toEqual({
      error: null,
      loaded: false,
      loading: false,
    });
  });
  //jest test for subscribeToReducer -success
  it('should handle POST_SUBSCRIBE_TO_SUCCESS', () => {
    expect(
      subscribeToReducer(
        {},
        {
          type: `${POST_SUBSCRIBE_TO}_SUCCESS`,
        },
      ),
    ).toEqual({
      error: null,
      loaded: true,
      loading: false,
    });
  });
  //jest test for subscribeToReducer -fail
  it('should handle POST_SUBSCRIBE_TO_FAIL', () => {
    const action = {
      type: `${POST_SUBSCRIBE_TO}_FAIL`,
      error: {
        response: {
          body: { error: 'error' },
        },
      },
    };
    expect(subscribeToReducer({}, action)).toEqual({
      error: true,
      loaded: false,
      loading: false,
      error_message: action.error?.response?.body?.error,
    });
  });
  //jest test for subscribeToReducer -pending
  it('should handle POST_SUBSCRIBE_TO_PENDING', () => {
    expect(
      subscribeToReducer(
        {},
        {
          type: `${POST_SUBSCRIBE_TO}_PENDING`,
        },
      ),
    ).toEqual({
      error: null,
      loaded: false,
      loading: true,
    });
  });
});
